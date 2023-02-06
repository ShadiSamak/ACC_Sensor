FROM python:3.9-alpine
RUN mkdir /app
ADD . /app

WORKDIR /app/front-end
RUN apk update && apk upgrade && \
    apk add nodejs \
    npm                       
    
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN pip install -r requirements.txt
#RUN apk add r-base
CMD ["python", "__main__.py"]