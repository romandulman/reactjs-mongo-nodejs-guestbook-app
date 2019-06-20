pipeline {
    agent none

 /* agent {
    node {
      label 'host3-jenkins-dind-nodejs-slave'
   }
  }
  */

  stages {
  agent {
      node {
        label 'host3-jenkins-dind-nodejs-slave'
     }
    }
    stage ('Checkout Code') {
      steps {
        checkout scm

      }
    }

    stage('Unit Tests'){
      steps {
       sh 'cd guestbook-backend && npm install '
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
            timeout(time: 1, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }
      }
    }

    stage('Integration Tests'){
         steps {
          sh 'cd guestbook-backend && npm install '
           sh 'cd guestbook-frontend && npm install '
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

  }
}
