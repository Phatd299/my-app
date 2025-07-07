pipeline {
  agent any

  environment {
    APP_NAME = "my-node-app"
    EC2_USER = "ec2-user"                     // Or "ubuntu" for Ubuntu AMIs
    EC2_HOST = "47.129.154.101"           // Replace with your actual EC2 IP
    SSH_CREDENTIAL_ID = "ec2-ssh"             // The ID of your Jenkins SSH credential
    EC2_APP_DIR = "~/app"
  }

  stages {
    stage('Checkout Code') {
      steps {
        echo '📥 Cloning repository...'
        git 'https://github.com/Phatd299/my-app'
      }
    }

    stage('Build Docker Image (Locally)') {
      steps {
        echo '🐳 Building Docker image locally for testing...'
        sh 'docker build -t $APP_NAME .'
      }
    }

    stage('Deploy to EC2') {
      steps {
        echo '🚀 Deploying to EC2...'
        sshagent (credentials: [SSH_CREDENTIAL_ID]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
              echo "🛑 Stopping old container (if exists)..." &&
              docker stop $APP_NAME || true &&
              docker rm $APP_NAME || true &&
              rm -rf $EC2_APP_DIR &&
              mkdir -p $EC2_APP_DIR
            '

            echo "📦 Uploading app files..."
            scp -o StrictHostKeyChecking=no -r * ${EC2_USER}@${EC2_HOST}:$EC2_APP_DIR/

            echo "🔄 Rebuilding and starting container..."
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
              cd $EC2_APP_DIR &&
              docker build -t $APP_NAME . &&
              docker run -d -p 80:3000 --name $APP_NAME $APP_NAME
            '
          """
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment completed successfully!'
    }
    failure {
      echo '❌ Deployment failed. Check the logs.'
    }
  }
}
