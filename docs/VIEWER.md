# 모델 보는 방법

[처음으로](../README.md)

## Netlify 업로드

1. [Battery-Design-Files-Netlify.zip](../downloads/Battery-Design-Files-Netlify.zip)을 다운로드합니다.
2. [Netlify Drop](https://app.netlify.com/drop)에 ZIP을 올립니다.
3. 발급된 HTTPS 주소를 엽니다. 첫 화면에서 Segment, Battery Box, Frame, Description을 선택합니다.

저장소를 Netlify에 연결하는 경우 배포 폴더는 `site`, 빌드 명령은 비워 둡니다. 저장소 전체나 archive 폴더를 배포할 필요가 없습니다. 공개 웹 배포 시 site 안의 모델과 계산기는 방문자가 접근할 수 있습니다.

## 로컬에서 확인

Python 3가 설치되어 있다면 저장소 폴더에서 아래 명령을 실행하고 http://localhost:8000 을 여세요.

```sh
python3 -m http.server 8000 --directory site
```

이 배포본은 HTTP/HTTPS에서 모델 데이터를 읽으므로 index.html을 더블클릭하는 file:// 실행 방식은 사용하지 않습니다. 최신 브라우저의 WebGL과 gzip 압축 해제 기능을 사용합니다.

## 조작

- 드래그: 회전 / 휠: 확대·축소
- 시점 버튼: 정면·후면·측면·상부·입체 보기
- ↑ 길게 누르기: 분해 / ↓ 길게 누르기: 조립
- 조립·분해 슬라이더: 원하는 단계로 이동
- 부품 표시 메뉴: 조립체별 표시 전환

`site/assets`, `site/data`, `site/documents`를 함께 유지하세요. 모델은 필요한 화면에서 읽으며 압축은 형상 좌표를 바꾸지 않습니다.
