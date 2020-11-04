FROM debian:bullseye-slim

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install --no-install-recommends nodejs npm

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production
ENV PORT=80

CMD [ "/bin/bash", "cmd.sh" ]
