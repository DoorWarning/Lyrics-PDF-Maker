/**
 * 가사 텍스트를 파싱하여 줄 단위로 분리합니다.
 * - 연속된 줄바꿈을 하나의 줄바꿈으로 병합합니다.
 * - 각 줄이 maxLength를 초과하면 줄바꿈 처리합니다.
 */
export function parseLyrics(lyrics: string, maxLength: number = 20): string[] {
  // 1. 연속된 줄바꿈을 하나의 줄바꿈으로 병합
  const mergedLyrics = lyrics.replace(/\n+/g, '\n').trim();

  const lines = mergedLyrics.split('\n');
  const processedLines: string[] = [];

  for (const line of lines) {
    if (line.trim() === '') {
      processedLines.push('');
      continue;
    }

    // 2. 한 줄이 maxLength를 초과할 경우 분할
    let currentLine = line;
    while (currentLine.length > 0) {
      // 줄의 시작이 공백이면 제거 (단, 줄 전체가 공백인 경우는 제외)
      if (currentLine.startsWith(' ') && currentLine.trim() !== '') {
        currentLine = currentLine.substring(1);
        if (currentLine.length === 0) break;
      }
      
      processedLines.push(currentLine.substring(0, maxLength));
      currentLine = currentLine.substring(maxLength);
    }
  }

  return processedLines;
}

/**
 * 줄 단위 데이터를 페이지 단위로 분할합니다.
 */
export function paginateLines(lines: string[], linesPerPage: number = 25): string[][] {
  const pages: string[][] = [];
  for (let i = 0; i < lines.length; i += linesPerPage) {
    pages.push(lines.slice(i, i + linesPerPage));
  }
  return pages;
}
