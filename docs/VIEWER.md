# 포트폴리오 17장 · 모델 확인 방법

[근거 자료 목록](../README.md) · [설계 파일 설명](DESIGN.md)

최신 모델은 **Battery Design Files**에 들어 있습니다. Segment에서 세그먼트를, Battery Box에서 전체 팩과 전장품 배치를 확인하세요. Description은 설계 과정 설명입니다. Frame은 참고 형상이며 차량 체결 방식은 미정입니다.

## 모델 파일 열기

현재 공유용 웹 주소는 등록되지 않았습니다. [최신 뷰어 ZIP](../downloads/Battery-Design-Files-Netlify.zip)을 내려받아 압축을 해제하면 모델 파일 전체를 받을 수 있습니다.

Python 3가 설치된 경우 압축을 푼 폴더에서 다음을 실행한 뒤 **http://localhost:8000**을 엽니다.

```sh
python3 -m http.server 8000
```

이 뷰어는 HTTP/HTTPS로 데이터를 읽습니다. HTML 더블클릭만으로 실행되지는 않습니다. 최신 브라우저의 WebGL과 gzip 압축 해제 기능을 사용합니다.

## 확인할 동작

- 드래그로 회전하고 휠로 확대합니다.
- 시점 버튼으로 상부·측면 등을 확인합니다.
- **↑를 누르면 분해, ↓를 누르면 조립**됩니다. 길게 누르거나 슬라이더로 단계를 조절할 수 있습니다.
- 부품 표시 메뉴로 전장품과 내부 구조를 나눠 봅니다.

<details>
<summary>제출자용 · 웹 주소를 만드는 방법</summary>

[Netlify Drop](https://app.netlify.com/drop)에 위 ZIP을 업로드합니다. 저장소 연동 방식이라면 빌드 명령 없이 `site`를 배포 폴더로 지정합니다. 발급된 주소를 README에 등록하면 심사위원이 설치 없이 열 수 있습니다.

배포 시 site 안의 모델과 계산기를 방문자가 내려받을 수 있습니다. `assets`, `data`, `documents`는 함께 유지해야 합니다.

</details>
