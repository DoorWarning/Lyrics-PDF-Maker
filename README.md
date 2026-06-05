# 📝 가사 글쓰기 연습지 메이커 (Lyrics PDF Maker)

<p align="center">
  <img src="./public/favicon.svg" width="100" height="100" alt="Logo" />
</p>

<p align="center">
  <strong>좋아하는 노래 가사로 나만의 글쓰기 연습장을 만들어보세요.</strong><br />
  A4 사이즈 최적화 | 20x25 원고지 스타일 | 커스텀 폰트 지원
</p>

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://vercel.com/">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </a>
</p>

---

## ✨ 주요 기능 (Key Features)

### 📄 A4 규격 맞춤형 PDF 생성
- **20x25 그리드:** 가로 20칸, 세로 25칸의 정밀한 원고지 레이아웃을 제공합니다.
- **십자선 보조선:** 글씨 교정에 도움을 주는 연한 빨간색(+) 보조선이 포함되어 있습니다.
- **헤더/푸터:** 노래 제목, 페이지 번호, 사용된 폰트 정보가 자동으로 배치됩니다.

### ✍️ 스마트 텍스트 파싱
- **줄바꿈 유지:** 원곡 가사의 느낌을 살려 줄바꿈을 유지합니다.
- **연속 줄바꿈 병합:** 가사 사이의 불필요한 공백 줄을 자동으로 정리합니다.
- **자동 줄 넘김:** 20자를 초과하는 가사는 자동으로 다음 칸으로 정렬됩니다.

### 🛠️ 상세 편집 모드 (Interactive Editor)
- **줄 단위 편집:** PDF 생성 전, 각 행(Row)의 글자를 직접 수정할 수 있습니다.
- **실시간 카운터:** 각 줄마다 글자 수(N/20)를 실시간으로 확인 가능합니다.
- **미리보기 정보:** 총 줄 수와 예상 출력 페이지 수를 즉시 계산하여 보여줍니다.

### 🎨 커스텀 폰트 지원
- **글꼴 미리보기:** 사이트 내에서 선택한 폰트로 가사를 미리 볼 수 있습니다.
- **출력물 최적화:** 각 폰트의 디자인 특성에 맞춰 PDF 출력 크기와 위치를 개별 보정합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **PDF Generation:** [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 시작하기 (Getting Started)

### 설치 (Installation)

```bash
# 저장소 복제
git clone https://github.com/your-username/lyrics-pdf-maker.git

# 의존성 설치
npm install
```

### 실행 (Development)

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## 📂 폰트 추가 가이드 (Font Customization)

새로운 폰트를 추가하려면 다음 과정을 따르세요:

1. `public/fonts/` 경로에 새로운 폴더를 생성하고 `.ttf` 파일을 넣습니다.
2. `src/app/globals.css`에 `@font-face`를 등록합니다.
3. `src/constants/fonts.ts`에 폰트 정보를 추가합니다. (이때 `id`는 반드시 영문으로 작성해야 합니다.)

---

## 📄 라이선스 (License)

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
