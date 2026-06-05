import jsPDF from 'jspdf';
import { paginateLines, parseLyrics } from './textUtils';

interface GeneratePdfOptions {
  title: string;
  lyrics: string;
  fontId: string;           // PDF 내부 ID (영문)
  fontDisplayName: string;  // 하단 표시용 (한글 가능)
  fontUrl: string;
  fontSize: number;
  yOffset: number;
}

export async function generateLyricsPdf({
  title,
  lyrics,
  fontId,
  fontDisplayName,
  fontUrl,
  fontSize,
  yOffset,
}: GeneratePdfOptions) {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  });

  // 1. 폰트 로드 및 등록
  try {
    const fontResponse = await fetch(fontUrl);
    const fontArrayBuffer = await fontResponse.arrayBuffer();
    const fontUint8Array = new Uint8Array(fontArrayBuffer);
    
    let binary = '';
    const len = fontUint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(fontUint8Array[i]);
    }
    const base64Font = btoa(binary);

    // fontId(영문)를 사용하여 등록
    doc.addFileToVFS(`${fontId}.ttf`, base64Font);
    doc.addFont(`${fontId}.ttf`, fontId, 'normal');
    doc.setFont(fontId);
  } catch (error) {
    console.error('Font loading failed:', error);
  }

  const processedLines = parseLyrics(lyrics, 20);
  const pages = paginateLines(processedLines, 25);

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 15;
  const marginTop = 30;
  const cellSize = 9;

  pages.forEach((pageLines, pageIdx) => {
    if (pageIdx > 0) doc.addPage();

    // 헤더 정보 (제목 중앙, 페이지 번호 오른쪽)
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text(title, pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`${pageIdx + 1} / ${pages.length}`, pageWidth - marginX, 15, { align: 'right' });

    // 푸터 정보 (한글 이름 표시 가능)
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Font: ${fontDisplayName}`, marginX, pageHeight - 10);

    // 그리드 및 텍스트 렌더링
    doc.setFont(fontId); // 텍스트 렌더링 전 다시 한 번 폰트 설정
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 20; col++) {
        const x = marginX + col * cellSize;
        const y = marginTop + row * cellSize;

        // 1. 네모 칸 그리기
        doc.setDrawColor(200); // 연한 회색
        doc.setLineWidth(0.2);
        doc.rect(x, y, cellSize, cellSize);

        // 2. 십자선 보조선 그리기 (연한 빨간색)
        doc.setDrawColor(255, 200, 200); // 연한 빨간색 (RGB)
        doc.setLineDashPattern([0.5, 0.5], 0);
        // 가로 보조선
        doc.line(x, y + cellSize / 2, x + cellSize, y + cellSize / 2);
        // 세로 보조선
        doc.line(x + cellSize / 2, y, x + cellSize / 2, y + cellSize);
        doc.setLineDashPattern([], 0); // 다시 실선으로

        // 3. 글자 렌더링 (연한 회색)
        const lineText = pageLines[row] || '';
        const char = lineText[col] || '';
        if (char) {
          doc.setFontSize(fontSize); 
          doc.setTextColor(180); // 연한 회색 (0-255)
          // 글자를 칸 중앙에 배치
          doc.text(char, x + cellSize / 2, y + cellSize / 2 + yOffset, {
            align: 'center',
            baseline: 'middle',
          });
        }
      }
    }
  });

  doc.save(`${title}_writing_practice.pdf`);
}
