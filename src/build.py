# Sestaví hru do jednoho souboru ../index.html
# Spuštění:  python3 src/build.py   (nebo python src/build.py ve Windows)
import json, os

S = os.path.dirname(os.path.abspath(__file__))
def rd(name):
    return open(os.path.join(S, name), encoding='utf-8').read()

base = rd('kaktus.html')
had = json.loads(rd('data/pieces2.json'))

# pořadí modulů je důležité – pozdější moduly obalují funkce těch dřívějších
code = ''.join(rd(f) + '\n' for f in ['kulisy.js', 'kulisy2.js', 'kulisy3.js', 'kulisy4.js'])
code += 'const HAD=' + json.dumps(had, separators=(',', ':')) + ';\n'
code += ''.join(rd(f) + '\n' for f in ['herorig.js', 'herorig3.js', 'melee3.js', 'parkour4.js', 'noanim.js', 'bg5.js', 'boss1.js'])
code += 'const PRA=' + rd('data/pr.json') + ';\n'
code += ''.join(rd(f) + '\n' for f in ['pirate.js', 'pirintro.js', 'shipjump.js', 'smooth.js', 'menu3.js', 'quests.js', 'map2.js', 'cls3.js', 'rewards.js', 'qmenu.js'])
code += 'const E2A={};\n' + rd('enemies2.js') + '\n'
code += 'const E3A=' + rd('data/en3.json') + ';\n' + rd('enemies3.js') + '\n'
code += rd('hudbar.js') + '\nwindow.__HAS=HAS;\n'

anchor = '/* ===== v60: džungle vyřazena'
assert base.count(anchor) == 1
out = base.replace(anchor, code + '\n' + anchor)
out = out.replace('<title>Kaktus</title>', '<title>Kaktus: Srdce pouště</title>')
dst = os.path.join(S, '..', 'index.html')
open(dst, 'w', encoding='utf-8').write(out)
print('hotovo:', os.path.normpath(dst), len(out), 'znaků')
