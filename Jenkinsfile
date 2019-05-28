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


    stage ('Verify Tools'){
      steps {
        parallel (
          node: { sh "npm -v" },
          docker: { sh "docker -v" }
        )
      }
    }
    stage('Unit Tests'){
      steps {
        sh 'cd guestbook-backend && npm install'
        sh 'cd guestbook-frontend && npm install'

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

    stage('Build Docker image'){
     steps{
        sh 'cd guestbook-frontend && npm  run build'
        sh 'docker build -t guestbook .'

     }
    }
    stage('Run Docker container'){
     steps{
        sh 'docker run  -d --name guestbook_app -p 8080:8080 guestbook '

     }
    }

    stage('UI Tests'){
        steps{
        sh ''
        }
    }
  }
}
