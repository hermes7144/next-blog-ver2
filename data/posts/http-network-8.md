# 인증

## 8.1 인증이란?

**HTTP에서 사용하는 인증방법**

- BASIC 인증
- DIGEST 인증
- SSL 클라이언트 인증
- 폼 베이스 인증

## 8.2 BASIC 인증

BASIC 인증은 HTTP/1.0에 구현된 인증 방식으로 현재도 일부 사용됨.
BASIC 인증은 웹 서버와 대응하고 있는 클라이언트 사이에서 이뤄짐.
BASIC 인증에서는 Base64 인코딩 형식을 사용하고 있지만 암호화가 아니라 부가 정보 없이 복호화 할 수 있습니다.
즉, HTTPS 등에서 암호화되지 않은 통신 경로 상에서 BASIC 인증을 해서 도청된 경우 복호화된 유저 ID와 패스워드를 뺏길 가능성이 있다.

그 외에도 한번 BASIC 인증을 하면, 일반 브라우저에서는 로그아웃할 수 없다는 문제도 있다. BASIC 인증은 사용상의 문제와 많은 웹 사이트에서 요구되는 보안 등급에는 미치지 못해서 그다지 사용되지 않는다.

## 8.3 DIGEST 인증

BASIC 인증의 약점을 보완하며 HTTP/1.1에 소개되어 있다. DIGEST 인증에는 챌린지 리스폰스 방식 사용.
챌린지 리스폰스 방식은 최초에 상대방에게 인증 요구를 보내고 상대방 측에서 받은 챌린지 코드를 사용해서 리스폰스 코드를 계산합니다. 이 값을 상대에게 송신하여 인증을 하는 방법.
리스폰스 코드라는 패스워드와 챌린지 코드를 이용해서 계산한 결과를 상대에게 보내기 때문에 BASIC 인증에 비해 패스워드 누출 가능성이 줄어듬.
DIGEST 인증도 보안 등급에 미치지 못해 그다지 사용되지 않는다.

## 8.4 SSL 클라이언트 인증

유저 ID와 패스워드를 사용한 인증 방식은 이 두 가지 정보가 정확하다면 본인으로서 인증할 수 있다. 그러나 이 정보가 도난되었다면 제 3자가 위장하는 경우가 있다.
SSL 클라이언트 인증은 HTTPS의 클라이언트 인증서를 이용한 인증 방식입니다. HTTPS 장에서 설명했던 클라이언트 증명서를 인증할 때에 사용하는 방식으로 사전에 등록된 클라이언트에서의 엑세스인지 아닌지를 확인할 수 있다.

## 8.5 폼 베이스 인증

클라이언트가 서버 사의 웹 애플리케이션에 자격 정보(Credential)를 송신하여 그 자격 정보의 검증 결과에 따라 인증을 하는 방식.
대부분의 경우 사전에 등록해 둔 자격 정보인 유저 ID(임의의 문자열이나 메일 주소 등이 자주 사용)와 패스워드를 입력해서 이것을 웹 애플리케이션 측에 송신하고 검증 결과를 토대로 검증 성공 여부를 결정.

### 8.5.1 인증의 대부분은 폼 베이스 인증

BASIC 인증이나 DIGEST 인증은 사용상, 보안적 문제로 거의 사용 안 됨. 보안 등급이 높은 SSL 클라이언트 인증도 도입 비용이나 운용 비용 등의 문제로 널리 사용되지 못함.
예를 들면 SSH나 FTP 같은 프로토콜이 서버와 클라이언트 사이에서 사용하는 인증에는 표준적인 것이 있어서 그대로 이용할 수 있다. 그러나 웹 사이트의 인증 기능으로서 요구되는 기능의 레벨을 충족시킨 표준적인 것이 존재하지 않기 때문에 웹 애플리케이션에서 제각각 구현하는 폼 베이스 인증을 채용하는 수 밖에 없다.

공통 사양이 결정되어 있지 않은 폼 베이스 인증은 웹 사이트 별로 다르게 구현하고 있습니다. 안전한 방법으로 구현하면 높은 보안 등급을 유지할 수 있지만, 문제 있는 구조를 하고 있는 웹 사이트도 있다.

### 8.5.2 세션 관리와 쿠키에 의한 구현

폼 베이스 인증은 표준 사양이 결정되어 있지 않지만 일반적으로 세션 관리를 위해 쿠키를 상요하는 방법이 있다.
폼 베이스 인증의 인증 자체는 서버 측의 웹 애플리케이션 등에 의하여 클라이언트가 송신해온 유저 ID와 패스워드가 사전에 등록하고 있는 것과 일치하는지 어떤지를 검증하면서 이루어집니다.

그러나 HTTP는 스테이트리스 프로토콜이기 때문에 방금 전에 인증을 성공했던 유저라는 상태를 프로토콜 레벨에서는 유지할 수 없습니다. 즉, 상태 관리가 안되기 때문에, 다음에 그 유저가 액세스했다고 하더라도 다른 유저와 구별하지 못합니다. 그래서 세션 관리와 쿠키를 사용하여 HTTP에 없는 상태 관리 기능을 보충합니다.