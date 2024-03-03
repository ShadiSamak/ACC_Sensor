FROM python:3.9-alpine
RUN mkdir /app
ADD . /app

WORKDIR /app/frontend
RUN apk update && apk upgrade && \
    apk add nodejs \
    npm                       
    
RUN npm install
RUN npm run build

WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt
#RUN apk add r-base
CMD ["python", "__main__.py"]