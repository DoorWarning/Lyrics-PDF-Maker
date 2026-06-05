export interface FontOption {
  id: string;        // PDF 내부에서 사용할 영문 ID (ASCII 필수)
  name: string;      // UI에서 보여줄 한글 이름
  url: string;
  family: string;    // CSS font-family
  size: number;
  yOffset: number;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'KCC-Chassam',
    name: 'KCC-차쌤체',
    url: '/fonts/KCC_Chassam/KCC-Chassam.ttf',
    family: 'KCC-Chassam',
    size: 16,
    yOffset: 0.5,
  },
  {
    id: 'SDMiSaeng',
    name: '미생체',
    url: '/fonts/SDMiSaeng/SDMiSaeng.ttf', // 대소문자 정확히 수정
    family: 'SDMiSaeng',
    size: 20,
    yOffset: 0.5,
  },
];
