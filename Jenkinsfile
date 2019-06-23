pipeline {
   environment {
             registry = "192.168.2.11:8082/guestbook"
             registryCredential = 'localdockerreg'
             dockerImage = ''
          }
  agent {
    node {
      label 'host3-jenkins-dind-nodejs-slave'
   }
  }

  stages {
    stage ('Checkout Code') {
      steps {
        checkout scm

      }
    }

    stage('Build Frontend'){
             /* Build Docker Image & Publish to Local Nexus Private Docker registry  */


         steps{
        sh 'cd guestbook-frontend && npm install && npm  run build'

         }
        }

    stage('Build Docker Image & Publish'){
             /* Build Docker Image & Publish to Local Nexus Private Docker registry  */


         steps{
          script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
          docker.withRegistry( '', registryCredential ) {
                      dockerImage.push()
                      }
                 }
         }
        }


    stage('Unit Tests'){
      steps {
       sh 'cd guestbook-backend  '
        sh 'cd guestbook-frontend && npm install '
      }
    }

    stage('Static Code Analysis'){
        environment {
            scannerHome = tool 'SonarQubeScanner'
        }
      steps {
            withSonarQubeEnv('Host-2-SonarQube') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
          /*  timeout(time: 1, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }*/
      }
    }

    stage('Integration Tests'){
         steps {
          sh 'cd guestbook-backend  '
           sh 'cd guestbook-frontend  '
         }
       }



 /* QA & Test ENV */
stage ('Deploy Docker Image To Test Server') {
      steps{
              sshagent(credentials : ['OPOTEL-GLOBAL-SSH']) {
                  sh 'ssh -o StrictHostKeyChecking=no devadmin@192.168.2.15 uptime'
                  sh 'ssh -v devadmin@192.168.2.15 docker pull 192.168.2.11:8082/guestbook:1'
                  
              }
          }
    }

  }
}
