import { readdirSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { basename, join } from 'path'
import { fileURLToPath } from 'url'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = join(root, 'dist')

// The dev server compiles slides on demand and may reload the page, so slides can
// still show "Loading slide..." when the PDF is printed, and Slidev reports no error.
// There is no fixed wait that is always long enough: check the output and retry.
const waitsMs = [10000, 30000, 60000]

mkdirSync(outDir, { recursive: true })

const filter = process.argv[2] // e.g. "ch01" or "01"
const chapters = readdirSync(root)
  .filter(f => /^\d+.*\.md$/.test(f) && (!filter || f.startsWith(filter)))
  .sort()

console.log(`找到 ${chapters.length} 個章節：${chapters.join(', ')}\n`)

// Requires pdftotext (Poppler) on PATH
function countLoadingSlides(pdf) {
  const text = execSync(`pdftotext -enc UTF-8 "${pdf}" -`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })
  return text.match(/Loading slide/g)?.length ?? 0
}

const failed = []

for (const file of chapters) {
  const name = basename(file, '.md')
  const pdfOutput = join(outDir, `${name}.pdf`)

  console.log(`▶ 匯出 ${file} → PDF...`)
  try {
    let loading = 0
    for (const wait of waitsMs) {
      execSync(
        `pnpm slidev export "${file}" --format pdf --output "${pdfOutput}" --with-toc false --timeout 60000 --wait-until networkidle --wait ${wait}`,
        { cwd: root, stdio: 'inherit' }
      )
      loading = countLoadingSlides(pdfOutput)
      if (loading === 0) break
      console.warn(`  ${loading} 頁尚未載入完成（等待 ${wait / 1000} 秒）`)
    }

    if (loading > 0) throw new Error(`${loading} 頁仍未載入完成`)

    console.log(`✔ 完成 ${name}.pdf\n`)
  } catch (err) {
    failed.push(name)
    console.error(`✘ 失敗：${file}\n`, err.message)
  }
}

if (failed.length > 0) {
  console.error(`\n${failed.length} 個章節失敗：${failed.join(', ')}`)
  process.exit(1)
}

console.log('全部完成！PDF 存放在 dist/ 資料夾。')
