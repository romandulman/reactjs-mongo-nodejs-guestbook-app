pipeline {
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

    stage('Unit Tests'){
      steps {
       sh 'cd guestbook-backend  '
        sh 'cd guestbook-frontend  '
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

    stage('Build Docker Image & Publish'){
         /* Build Docker Image & Publish to Local Nexus Private Docker registry  */
     steps{
        sh 'docker build -t guestbook .'
        sh 'docker tag guestbook 192.168.2.11:8082/guestbook:${env.BUILD_NUMBER}'
        sh 'docker push 192.168.2.11:8082/guestbook:${env.BUILD_NUMBER}'
     }
    }

 /* QA & Test ENV */
stage ('Deploy Docker Image To Test Server') {
      steps{
              sshagent(credentials : ['OPOTEL-GLOBAL-SSH']) {
                  sh 'ssh -o StrictHostKeyChecking=no devadmin@192.168.2.15 uptime'
                  sh 'ssh -v devadmin@192.168.2.15'
                  sh 'docker push 192.168.2.11:8082/guestbook:${env.BUILD_NUMBER}'
              }
          }
    }

  }
}
