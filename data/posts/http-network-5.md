# HTTP와 연계하는 웹 서버

## 5.1 1대로 멀티 도메인을 가능하게 하는 가상 호스트

HTTP/1.1에서는 하나의 HTTP 서버에 여러 개의 웹 사이트를 실행할 수 있다. 예를 들면, 웹 호스팅에 제공하고 있는 사업자는 1대의 서버에 여러 고객의 웹 사이트를 넣을 수 있습니다. 고객마다 다른 도메인을 가지고, 다른 웹사이트를 실행할 수 있습니다. 이를 위해 가상 호스트(Virtual Host)라는 기능을 사용하고 있습니다.

가상 호스트 기능을 사용하면 물리적으로는 서버가 1대지만 가상으로 여러 대가 있는 것처럼 설정하는 것이 가능합니다.

같은 IP 주소에서 다른 호스트명과 도메인 명을 가진 여러 개의 웹 사이트가 실행되고 있는 가상 호스트의 시스템이 있기 때문에, HTTP 리퀘스트를 보내는 경우에는 호스트명과 도메인명을 완전하게 포함한 URI를 지정하거나, 반드시 Host 헤더 필드에서 지정해야 합니다.

## 5.2 통신을 중계하는 프로그램: 프록시, 게이트웨이, 터널

**프록시**
서버와 클라이언트의 양쪽 역할을 하는 중계 프로그램으로, 클라이언트로부터의 리퀘스트를 서버에 전송하고, 서버로부터의 리스폰스를 클라이언트에 전송합니다.
**게이트웨이**
다른 서벌르 중계하는 서버로, 클라이언트로부터 수신한 리퀘스트를 리소스를 보유한 서버인 것처럼 수신합니다.
**터널**
서로 떨어진 두 대의 클라이언트와 서버 사이를 중꼐하며 접속을 주선하는 중계 프로그램.

### 5.2.1 프록시

프록시 서버의 기본적인 동작은 클라이언트로부터 받은 리퀘스트를 다른 서버에 전송하는 것입니다. 클라이언트로부터 받은 리퀘스트 URI를 변경하지 않고 그 다음 리소스를 가지고 있는 서버에 보냅니다.
리소스 본체를 가진 서버를 오리진 서버(Origin Server)라고 부릅니다. 오리진 서버로부터 되돌아온 리스폰스는 프록시 서버를 경유해서 클라이언트에 돌아옵니다.

프록시 서버를 사용하는 이유는 캐시를 사용해서 네트워크 대역 등을 효율적으로 사용하는 것과 조직 내에 특정 웹 사이트에 대한 엑세스 제한, 엑세스 로그를 획득하는 정책을 철저하게 지키려는 목적으로 사용.
프록시 사용방법

**캐싱 프록시(Cashing Proxy)**
프록시로 리스폰스를 중계하는 때에는 프록시 서버 상에 리소스 캐시를 보존해 두는 타입의 프록시.
프록시에 다시 같은 리소스에 리퀘스트가 온 경우, 오리진 서버가 아닌, 캐시를 리스폰스로서 되돌려 준다.

**투명 프록시(Transparent Proxy)**
투명 프록시: 프록시로 리퀘스트와 리스폰스를 중계할 때 메시지 변경을 하지 않는 타입의 프록시.
메시지 변경을 한다면 비투과 프록시.

### 5.2.2 게이트웨이

게이트웨이의 경우 그 다음에 있는 서버가 HTTP 서버 이외의 서비스를 제공하는 서버가 됩니다. 클라이언트와 게이트웨이 사이를 암호화하는 등으로 안전(secure)하게 접속함으로써 통신의 안전성을 높이는 역할.
ex) 데이터베이스에 접속해 SQL 쿼리를 사용해서 데이터를 얻는 곳에 이용. 쇼핑 사이트 등에서 신용 카드 결제 시스템 등과 연계시 사용.

### 5.2.3 터널

터널은 요구에 따라서 다른 서버와의 통신 경로를 확립합니다. 이때 클라이언트는 SSL 같은 암호화 통신을 통해 서버와 안전하게 통신하기 위해 사용.

## 5.3 리소스를 보관하는 캐시

캐시(Cache)는 프록시 서버와 클라이언트의 로컬 디스크에 보관된 리소스의 사본을 가리킨다. 캐시를 사용하면 리소스를 가진 서버의 엑세스를 줄이는 것이 가능하기 때문에 통신량과 통신 시간을 절약할 수 있다.
캐시 서버는 프록시 서버의 하나로 캐싱 프록시로 분류됩니다. 결국, 프록시가 서버러부터의 리스폰스를 중계하는 때에 프록시 서버 상에 리소스의 사본을 보존합니다.
캐시 서버의 장점은 캐시를 이용함으로써 같은 데이터를 몇 번이고 오리진 서버에 전송할 필요가 없다는 것. 그래서 클라이언트는 네트워크에서 가까운 서버로부터 리소스를 얻어서 서버는 같은 리퀘스트를 매번 처리하지 않아도 된다.

### 5.3.1 캐시는 유효기간이 있다

캐시 서버에 캐시가 있는 경우라도 같은 리소스의 리퀘스트에 대해서 항상 캐시를 돌려 준다고는 할 수 없다. 이것은 캐시 되어있는 리소스의 유효성과 관계있다.
캐시를 가지고 있더라도 클라이언트의 요구나 캐시의 유효 기간 등에 의해서 오리진 서버에 리소스의 유효성을 확인하거나 새로운 리소스를 다시 획득하러 가게 되는 경우가 있다.

### 5.3.2 클라이언트 측에도 캐시가 있다

클라이언트에 존재하는 캐시를 인터넷 임시 파일이라고 함. 브라우저가 유효한 캐시를 가지고 있는 경우, 같은 리소스의 액세스는 서버에 액세스하지 않고 로컬 디스크로부터 볼러옴.
캐시 서버와 마찬가지로 리소스가 오래된 것으로 판단하는 경우에는 오리진 서버에 리소스의 유효성을 확인하러 가거나 새로운 리소스를 다시 획득하러 갑니다.