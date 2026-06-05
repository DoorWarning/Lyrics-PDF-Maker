'use client';

import { useState } from 'react';
import { FONT_OPTIONS } from '@/constants/fonts';
import { generateLyricsPdf } from '@/utils/pdfGenerator';
import { parseLyrics } from '@/utils/textUtils';

export default function Home() {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 상세 편집 관련 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableLines, setEditableLines] = useState<string[]>([]);

  // 상세 편집 모드 진입
  const enterEditMode = () => {
    if (!lyrics.trim()) {
      alert('가사를 먼저 입력해주세요.');
      return;
    }
    const parsed = parseLyrics(lyrics, 20);
    setEditableLines(parsed);
    setIsEditMode(true);
  };

  // 줄 수정
  const handleLineChange = (index: number, value: string) => {
    const newLines = [...editableLines];
    newLines[index] = value.substring(0, 20); // 최대 20자 제한
    setEditableLines(newLines);
  };

  // 줄 추가/삭제
  const addLine = (index: number) => {
    const newLines = [...editableLines];
    newLines.splice(index + 1, 0, '');
    setEditableLines(newLines);
  };

  const removeLine = (index: number) => {
    const newLines = [...editableLines];
    newLines.splice(index, 1);
    setEditableLines(newLines);
  };

  const handleDownload = async () => {
    if (!title) {
      alert('노래 제목을 입력해주세요.');
      return;
    }

    setIsGenerating(true);
    try {
      // 편집 모드면 편집된 내용을, 아니면 원본을 파싱해서 사용
      const finalLines = isEditMode ? editableLines : parseLyrics(lyrics, 20);
      
      await generateLyricsPdf({
        title,
        lyrics: finalLines.join('\n'), // pdfGenerator 내부에서 다시 파싱하지만 \n으로 합쳐서 전달
        fontId: selectedFont.id,
        fontDisplayName: selectedFont.name,
        fontUrl: selectedFont.url,
        fontSize: selectedFont.size,
        yOffset: selectedFont.yOffset,
      });
    } catch (error) {
      console.error(error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 py-8 px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            가사 글쓰기 연습지 메이커
          </h1>
          <p className="text-indigo-100">
            좋아하는 노래 가사로 나만의 글쓰기 연습장을 만들어보세요.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* 공통 입력 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                노래 제목
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 밤양갱 - 비비"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="font" className="block text-sm font-semibold text-gray-700 mb-2">
                글꼴 선택
              </label>
              <select
                id="font"
                value={selectedFont.id}
                onChange={(e) => {
                  const font = FONT_OPTIONS.find((f) => f.id === e.target.value);
                  if (font) setSelectedFont(font);
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!isEditMode ? (
            /* 일반 모드: 텍스트 영역 */
            <div>
              <div className="flex justify-between items-end mb-2">
                <label htmlFor="lyrics" className="text-sm font-semibold text-gray-700">
                  노래 가사
                </label>
                <button
                  onClick={enterEditMode}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-200 transition font-medium"
                >
                  줄 단위 상세 편집 모드로 전환
                </button>
              </div>
              <textarea
                id="lyrics"
                rows={12}
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="여기에 가사를 입력하세요..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                style={{ 
                  fontFamily: selectedFont.family,
                  fontSize: `${selectedFont.size * 1.2}px` // UI에서 보기 좋게 약간 스케일업
                }}
              ></textarea>
            </div>
          ) : (
            /* 상세 편집 모드: 줄 단위 편집 */
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700">
                    상세 편집 (한 줄에 최대 20자)
                  </label>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full border border-indigo-100 font-medium">
                    총 {editableLines.length}줄 / 약 {Math.ceil(editableLines.length / 25)}페이지
                  </span>
                </div>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition font-medium"
                >
                  텍스트 입력 모드로 돌아가기
                </button>
              </div>
              <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-2 bg-gray-50">
                {editableLines.map((line, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <span className="text-xs text-gray-400 w-6 text-right font-mono">{idx + 1}</span>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => handleLineChange(idx, e.target.value)}
                        className="w-full px-3 py-2 pr-12 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                        maxLength={20}
                        style={{ 
                          fontFamily: selectedFont.family,
                          fontSize: `${selectedFont.size * 1.1}px` // 상세 편집창도 폰트 크기 반영
                        }}
                      />
                      <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono ${line.length >= 20 ? 'text-orange-500 font-bold' : 'text-gray-400'}`}>
                        {line.length}/20
                      </span>
                    </div>
                    <div className="flex opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => addLine(idx)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        title="아래에 줄 추가"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                      <button
                        onClick={() => removeLine(idx)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="줄 삭제"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-right">
                * 각 줄은 실제 PDF의 한 행(20칸)에 해당합니다.
              </p>
            </div>
          )}

          <div className="pt-4">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all ${
                isGenerating
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]'
              }`}
            >
              {isGenerating ? 'PDF 생성 중...' : '최종 PDF 연습지 다운로드'}
            </button>
          </div>
        </div>
      </div>


      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>© 2026 Lyrics Writing Practice PDF Maker. Built with Next.js & jsPDF.</p>
      </footer>
    </main>
  );
}
