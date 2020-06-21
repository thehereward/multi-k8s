docker build -t thehereward/multi-client:latest -t thehereward/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t thehereward/multi-server:latest -t thehereward/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t thehereward/multi-worker:latest -t thehereward/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push thehereward/multi-client:latest
docker push thehereward/multi-server:latest
docker push thehereward/multi-worker:latest
docker push thehereward/multi-client:$SHA
docker push thehereward/multi-server:$SHA
docker push thehereward/multi-worker:$SHA

kubectl apply -f ./k8s

kubectl set image deployments/client-deployment client=thehereward/multi-client:$SHA
kubectl set image deployments/server-deployment server=thehereward/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=thehereward/multi-worker:$SHA