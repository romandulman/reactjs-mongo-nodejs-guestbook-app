pipeline {
   environment {
             registry = '192.168.2.11:8082/guestbook'
             registryCredential = 'localdockerreg'
             registyAddr '192.168.2.11:8082'
             dockerImage = ''
             scannerHome = tool 'SonarQubeScanner'
   }
  agent {
    node {
      label 'host3-jenkins-dind-nodejs-slave'
    }
  }

  stages {

    stage ('Verify Tools'){
      steps {
            parallel (
              node: { sh "npm -v" },
              docker: { sh "docker -v" },
              artillery: { sh "artillery -V" }
            )
      }
    }

    stage ('Checkout Code') {
      steps {
        checkout scm

      }
    }

    stage('Unit Tests'){
      steps {
        sh 'cd guestbook-backend && npm install && npm test '
        sh 'cd guestbook-frontend && npm install && npm test '
      }
    }

    stage('Static Code Analysis'){
       /* SonarQube Analysis  */
      steps {
            withSonarQubeEnv('Host-2-SonarQube') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
            timeout(time: 1, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }
      }
    }

    stage('Build Frontend'){
          /* Build React Frontend  */
             steps{
              sh 'cd guestbook-frontend && npm install && npm  run build'
             }
          }

    stage('Build Docker Image & Publish'){
      /* Build Docker Image & Publish to Nexus Local  Private Docker registry  */
         steps{
             script {
               dockerImage = docker.build registry + ":$BUILD_NUMBER"
                docker.withRegistry( 'http://192.168.2.11:8082', registryCredential ) {
                  dockerImage.push()
                }
             }
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
