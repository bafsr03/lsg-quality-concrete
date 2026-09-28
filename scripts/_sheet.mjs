import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'
const manifest = JSON.parse(await readFile('content/generated/media-manifest.json','utf8'))
const EX=[/shutterstock/,/eal-roofing/,/grupo-25/,/angi-logo/,/images-1/,/cropped-/,/^59-/,/^71-/,/l-s-g-hero-/,/l-s-g-home-/,/^22988310-reviews/]
const imgs = manifest.filter(m=>!EX.some(r=>r.test(m.id)))
const CELL=200, COLS=7, PER=28
for (let s=0; s*PER<imgs.length; s++) {
  const batch = imgs.slice(s*PER,(s+1)*PER)
  const rows = Math.ceil(batch.length/COLS)
  const comps = []
  for (let i=0;i<batch.length;i++){
    const buf = await sharp('public'+batch[i].file).resize(CELL,CELL,{fit:'cover'}).toBuffer()
    comps.push({input:buf, left:(i%COLS)*CELL, top:Math.floor(i/COLS)*CELL})
  }
  await sharp({create:{width:COLS*CELL,height:rows*CELL,channels:3,background:'#cfcdc7'}})
    .composite(comps).jpeg({quality:78}).toFile(`/tmp/sheet-${s}.jpg`)
  console.log(`sheet-${s}.jpg:`, batch.map((b,i)=>`${i}:${b.id.replace(/^\d+-/,'')}`).join('  '))
}
