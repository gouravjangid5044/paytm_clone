pipeline {
  agent { label  'Jenkins-Agent'}
  tools {
    jdk 'Java17'
    maven 'Maven3'
    
  }

  stages {
    stage("cleanup Workspace"){
      steps{
        cleanWs()
      }
    }
    
    stage("Checkout from SCM"){
      steps{
        git branch: 'main', credentialsId: 'github', url: 'https://github.com/gouravjangid5044/paytm_clone'
      }
    }

    stage("Build Application"){
      steps{
        sh "mvn clean package"
      }
    }

    stage("Test Application"){
      steps{
        sh "mvn test"
      }
    }
    
  }
}
