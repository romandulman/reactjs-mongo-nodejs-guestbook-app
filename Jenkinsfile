pipeline {
  agent {
    node {
      label 'jenkins-dind-nodejs-slave'
    }
  }
  stages {
    stage ('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage ('Verify Tools'){
          steps {
            parallel (
              node: { sh "npm -v" },
              docker: { sh "docker -v" }
            )
          }
        }
    stage('Unit Tests Front-End'){
    sh 'cd guestbook-frontend && npm install'

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


  }
}
