FROM golang:1.16-alpine

WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY . /app

RUN go build -o /app/covid-19-daily-stat

EXPOSE 8080

CMD [ "/app/covid-19-daily-stat" ]
