pipeline {
   environment {
             registry = '192.168.2.11:8082/guestbook'
             registryCredential = 'localdockerreg'
             registyAddr = '192.168.2.11:8082'
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

    stage('Unit & Integration Tests '){
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
              sh 'cd guestbook-frontend && npm  run build'
             }
          }

 stage('Build Docker Image & Publish'){
      /* Build Docker Image & Publish to Nexus Local  Private Docker registry  */
         steps{
             script {
               dockerImage = docker.build(registry + ":$BUILD_NUMBER" ,"-f .docker/stage/Dockerfile .")
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

/* QA Env */
  /*  stage ('Deploy Docker Image To Test Server') {
         agent {
                node {
                 label 'app-test-jenkins-dind'
                 }
                }
                  steps {
                     sh 'docker pull 192.168.2.11:8082/guestbook' + ":$BUILD_NUMBER"
                  }

    }*/
    /* QA Env; Deploy Docker image to Stage/Test Server */

     stage ('Deploy To Test/Staging Server') {
             steps{
                  sshagent(credentials : ['OPOTEL-GLOBAL-SSH']) {

                      sh 'ssh -o StrictHostKeyChecking=no devadmin@192.168.2.15 uptime'
                      sh 'ssh -v devadmin@192.168.2.15'
                      sh 'ssh devadmin@192.168.2.15 docker pull 192.168.2.11:8082/guestbook' + ":$BUILD_NUMBER"
                      sh 'ssh devadmin@192.168.2.15 docker rm --force guestbook_app' /*remove prev image */
                      sh 'ssh devadmin@192.168.2.15 docker run  -d --name guestbook_app -p 8080:8080 -p 8443:8443 192.168.2.11:8082/guestbook' + ":$BUILD_NUMBER"

                  }
              }
        }

    stage('UI Tests'){
         /* Run Selenium test  */
          steps{
            sh 'cd guestbook-frontend && npm run seleniumtest'
          }
    }


        stage('Load Tests'){
         steps{
         /* Load tests */
          sh 'artillery quick --count 20 -n 20 http://192.168.2.15:8080/guests'
          sh 'artillery quick --count 20 -n 20 http://192.168.2.15:8080/login'

         }
        }
        stage ('Performance Tests '){
          agent {
            node {
             label 'host3-jenkins-dind-nodejs-slave'
             }
            }
              steps {
                 sh "npm -v"
              }
        }

  }
}
