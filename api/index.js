export const config = { runtime: 'edge' };

export default function handler(req) {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '';
  const name = url.searchParams.get('name') || '';
  const token = url.searchParams.get('token') || '';

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyplqYjuH90nkXz7j10_H7Xsx1emhUXy7jWVbZ1lds0Fis149El6XyykAbSRtK9XW8G/exec';

  // OG 메타 동적 생성
  let ogTitle = '명불허전학원 신규 상담 분석 안내';
  let ogDesc = '강동구 학습 관리 | 국어·영어·수학 맞춤 학습 상담';

  if (page === 'report' && name) {
    ogTitle = `${decodeURIComponent(name)} 학생 - 상담 분석 리포트`;
    ogDesc = '명불허전학원 AI 기반 학습 상담 분석 결과입니다.';
  } else if (page === 'consult') {
    ogTitle = '명불허전학원 - 상담 접수';
    ogDesc = '강동구 소수정원 전문 학원 | 무료 학습 상담 신청';
  } else if (page === 'survey') {
    ogTitle = '명불허전학원 - 학습 성향검사';
    ogDesc = 'AI 기반 학습 성향 진단 검사';
  }

  // 쿼리 파라미터 그대로 전달
  const params = url.search;

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ogTitle}</title>
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDesc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.origin}${url.pathname}${params}">
  <meta property="og:image" content="${url.origin}/og-mbhj-v2.png">
  <meta property="og:site_name" content="명불허전학원">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${ogTitle}">
  <meta name="twitter:description" content="${ogDesc}">
  <meta name="description" content="${ogDesc}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <style>
    *{margin:0;padding:0}html,body{width:100%;height:100%;overflow:hidden}
    iframe{width:100%;height:100%;border:none}
    .ld{position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;background:#f8fafc;z-index:10;transition:opacity .3s}
    .ld.h{opacity:0;pointer-events:none}
    .sp{width:36px;height:36px;border:3px solid #e2e8f0;border-top-color:#1e3a6e;border-radius:50%;animation:s .8s linear infinite}
    @keyframes s{to{transform:rotate(360deg)}}
    .ld p{font-family:sans-serif;font-size:14px;color:#64748b}
  </style>
</head>
<body>
  <div class="ld" id="ld"><div class="sp"></div><p>로딩 중...</p></div>
  <iframe id="f" allowfullscreen></iframe>
  <script>
    var f=document.getElementById('f');
    f.src='${APPS_SCRIPT_URL}${params}';
    f.onload=function(){document.getElementById('ld').classList.add('h')};
    setTimeout(function(){document.getElementById('ld').classList.add('h')},5000);
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
