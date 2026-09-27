# Battery Design Files

**Molicel P45B · 70S6P · 14S6P 세그먼트 5개 · 총 420셀**

Formula Student 전기차용 배터리팩의 전기적 구성과 기계 패키징을 검토하는 설계 프로젝트입니다. 직접 만든 계산기를 바탕으로 세그먼트, 배터리박스, 전장품 배치와 조립·분해 구조를 정리했습니다. 현재 자료는 **후속 설계 초안**이며 제작·시험 완료품을 뜻하지 않습니다.

## 처음 방문했다면

1. [설계 과정과 주요 수치](docs/DESIGN.md)를 읽습니다.
2. [모델 보는 방법](docs/VIEWER.md)에 따라 웹 뷰어를 엽니다. Segment → Battery Box → Description 순서로 보면 전체 구성을 이해하기 쉽습니다.
3. [직접 만든 Excel 계산기](site/documents/battery-pack-calculator.xlsx)와 [검증 범위](docs/VALIDATION.md)를 확인합니다.
4. 지원 포트폴리오가 필요하면 [기존 발표자료](archive/previous-portfolio/portfolio/application/SK_Hynix_AI_Hackathon_Battery_Portfolio_v39_FinalReviewed.pptx)를 참고합니다.

**과거 실물 프로젝트(50S·24S12P)와 현재 P45B·70S6P 설계는 다릅니다. 과거 검차 결과를 현재 모델의 검증 결과로 해석하지 마세요.**

## 필요한 파일 찾기

| 경로 | 용도 | 상태 |
|---|---|---|
| [site/](site/) | 최신 통합 웹 뷰어: 세그먼트·박스·차량 프레임·설계 설명 | 최신 배포본 |
| [downloads/](downloads/) | Netlify에 한 번에 올릴 ZIP | 최신 배포본 |
| [docs/](docs/) | 설계 개요, 실행 방법, 검증 범위 | 최신 안내 |
| [archive/previous-portfolio/](archive/previous-portfolio/) | 이전 CAD/STL, 부품표, 발표자료, 과거 미리보기 | 이력·참고 자료 |

```text
battery-segment-14s6p/
├── README.md
├── docs/                      # 처음 읽을 설명 문서
├── site/
│   ├── index.html             # Battery Design Files 시작 화면
│   ├── assets/                # 화면과 뷰어 동작
│   ├── data/                  # 압축 모델 데이터: 모두 함께 유지
│   └── documents/             # 설계 계산기
├── downloads/
│   └── Battery-Design-Files-Netlify.zip
└── archive/previous-portfolio/ # 이전 자료; 최신 제작 도면 아님
```

## 웹으로 열기

[Netlify 업로드 ZIP](downloads/Battery-Design-Files-Netlify.zip)을 내려받아 Netlify Drop에 올리거나, 저장소 연동 시 빌드 명령 없이 `site`를 배포 폴더로 지정하세요. 아직 확정된 배포 주소는 없습니다.

GitHub 파일 화면에서는 HTML이 실행되지 않습니다. 로컬 실행 방법은 [뷰어 안내](docs/VIEWER.md)를 확인하세요. 저장소는 기존 비공개 설정을 유지하며, 저장소 자료를 보려면 접근 권한이 필요합니다.

## 부품 자료를 볼 때

최신 부품 구분은 웹 뷰어의 조립체별 표시 메뉴를 기준으로 보세요. [이전 부품표](archive/previous-portfolio/portfolio/documents/PARTS.md)와 [이전 CAD](archive/previous-portfolio/portfolio/cad/)는 이력 보존 자료입니다. 최신 웹 형상과 일치하는 제조용 BOM·CAD로 재검증된 자료가 아닙니다.
