pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                kubernetes {
                  yaml '''
                    apiVersion: v1
                    kind: Pod
                    metadata:
                        labels:
                        some-label: some-label-value
                    spec:
                        containers:
                        - name: npm-builder
                          image: node:22-alpine
                          command:
                          - cat
                          tty: true
                    '''
                }
            }
            steps {
                container('npm-builder') {
                    sh 'npm install'
                    // Build the React app
                    sh 'npm run build'
                }
            }
        }
    }
}