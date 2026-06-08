from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape

OUT = Path("deliverables/EventVault-Pitch-Deck.pptx")
W, H = 12192000, 6858000


def emu(px):
    return int(px * 9525)


def text_runs(lines, size=28, color="17201B", bold=False):
    body = []
    for line in lines:
        weight = ' b="1"' if bold else ""
        body.append(
            f"""
            <a:p>
              <a:r>
                <a:rPr lang="en-US" sz="{size * 100}"{weight}>
                  <a:solidFill><a:srgbClr val="{color}"/></a:solidFill>
                </a:rPr>
                <a:t>{escape(line)}</a:t>
              </a:r>
              <a:endParaRPr lang="en-US" sz="{size * 100}"/>
            </a:p>"""
        )
    return "".join(body)


def shape(idx, x, y, w, h, fill, line="FFFFFF", radius=False):
    preset = "roundRect" if radius else "rect"
    return f"""
    <p:sp>
      <p:nvSpPr><p:cNvPr id="{idx}" name="Shape {idx}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>
        <a:prstGeom prst="{preset}"><a:avLst/></a:prstGeom>
        <a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>
        <a:ln><a:solidFill><a:srgbClr val="{line}"/></a:solidFill></a:ln>
      </p:spPr>
    </p:sp>"""


def textbox(idx, x, y, w, h, lines, size=28, color="17201B", bold=False):
    return f"""
    <p:sp>
      <p:nvSpPr><p:cNvPr id="{idx}" name="Text {idx}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        <a:noFill/><a:ln><a:noFill/></a:ln>
      </p:spPr>
      <p:txBody>
        <a:bodyPr wrap="square" anchor="t"/>
        <a:lstStyle/>
        {text_runs(lines, size, color, bold)}
      </p:txBody>
    </p:sp>"""


def slide_xml(parts):
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree>
    <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
    <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{W}" cy="{H}"/><a:chOff x="0" y="0"/><a:chExt cx="{W}" cy="{H}"/></a:xfrm></p:grpSpPr>
    {''.join(parts)}
  </p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""


slides = [
    [
        shape(2, 0, 0, 1280, 720, "F7F5EF"),
        shape(3, 760, 70, 420, 560, "0D766F", "0D766F", True),
        shape(4, 812, 130, 140, 110, "F4D58D", "F4D58D", True),
        shape(5, 980, 270, 150, 190, "FFFFFF", "FFFFFF", True),
        textbox(6, 80, 78, 620, 80, ["EventVault"], 46, "0D766F", True),
        textbox(7, 82, 165, 650, 220, ["Event & Media Management Platform"], 42, "17201B", True),
        textbox(8, 84, 410, 560, 120, ["A centralized, role-aware media workspace for clubs, photographers, and members."], 24, "64736B"),
        textbox(9, 84, 585, 520, 40, ["Prototype, architecture, schema, and demo flow included"], 20, "C9852F", True),
    ],
    [
        shape(2, 0, 0, 1280, 720, "FFFFFF"),
        textbox(3, 70, 52, 700, 70, ["Problem"], 40, "17201B", True),
        textbox(4, 72, 128, 950, 52, ["Event media gets scattered across personal folders, drive links, and private chats."], 24, "64736B"),
        *[shape(10 + i, 75 + i * 292, 245, 250, 230, c, c, True) for i, c in enumerate(["DFF3EF", "F7E7CC", "E8EEF6", "F6DFE2"])],
        textbox(20, 102, 278, 190, 110, ["Hard to search"], 28, "07534E", True),
        textbox(21, 394, 278, 190, 110, ["Private access is unclear"], 26, "6F4619", True),
        textbox(22, 686, 278, 190, 110, ["No single album view"], 26, "244B73", True),
        textbox(23, 978, 278, 190, 110, ["Photos of a person are hard to find"], 24, "7B3540", True),
    ],
    [
        shape(2, 0, 0, 1280, 720, "F7F5EF"),
        textbox(3, 70, 52, 820, 70, ["Product Experience"], 40, "17201B", True),
        textbox(4, 70, 130, 720, 54, ["Six working sections map directly to the judging criteria."], 24, "64736B"),
        *[shape(10 + i, 80 + (i % 3) * 380, 230 + (i // 3) * 190, 320, 130, "FFFFFF", "DCE4DF", True) for i in range(6)],
        textbox(20, 112, 260, 240, 58, ["Dashboard"], 26, "0D766F", True),
        textbox(21, 492, 260, 240, 58, ["Events"], 26, "0D766F", True),
        textbox(22, 872, 260, 240, 58, ["Gallery"], 26, "0D766F", True),
        textbox(23, 112, 450, 240, 58, ["Upload"], 26, "0D766F", True),
        textbox(24, 492, 450, 240, 58, ["Face Match"], 26, "0D766F", True),
        textbox(25, 872, 450, 240, 58, ["Analytics"], 26, "0D766F", True),
    ],
    [
        shape(2, 0, 0, 1280, 720, "FFFFFF"),
        textbox(3, 70, 52, 900, 70, ["Scalable Architecture"], 40, "17201B", True),
        textbox(4, 70, 125, 920, 54, ["The prototype is static, but the production plan is cloud-native and media-first."], 24, "64736B"),
        *[shape(10 + i, 80 + i * 190, 285, 150, 92, "DFF3EF", "0D766F", True) for i in range(6)],
        textbox(20, 100, 318, 100, 40, ["Web App"], 20, "07534E", True),
        textbox(21, 290, 318, 100, 40, ["API"], 20, "07534E", True),
        textbox(22, 480, 318, 100, 40, ["Postgres"], 20, "07534E", True),
        textbox(23, 670, 318, 100, 40, ["S3/CDN"], 20, "07534E", True),
        textbox(24, 860, 318, 100, 40, ["Workers"], 20, "07534E", True),
        textbox(25, 1050, 318, 100, 40, ["AI"], 20, "07534E", True),
        textbox(26, 82, 505, 960, 92, ["Signed URLs, background compression, AI tagging, face embeddings, moderation, and realtime notification streams keep the app scalable."], 26, "17201B"),
    ],
    [
        shape(2, 0, 0, 1280, 720, "16211D"),
        textbox(3, 70, 58, 850, 70, ["Demo Story"], 40, "FFFFFF", True),
        textbox(4, 72, 140, 820, 52, ["A short path that shows the project end to end."], 24, "C5D5CD"),
        textbox(5, 92, 245, 980, 260, [
            "1. Switch roles to show private access control",
            "2. Create an event album and sort/filter events",
            "3. Search gallery by event, tag, uploader, and date",
            "4. Upload files, preview them, publish, and interact",
            "5. Upload selfie, view matches, then review analytics"
        ], 27, "FFFFFF"),
        shape(6, 82, 585, 1030, 54, "F4D58D", "F4D58D", True),
        textbox(7, 108, 600, 820, 35, ["Built as a clean, dependency-free prototype for fast judging and local review."], 20, "17201B", True),
    ],
]

rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>"""

theme = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="EventVault">
  <a:themeElements>
    <a:clrScheme name="EventVault">
      <a:dk1><a:srgbClr val="17201B"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="16211D"/></a:dk2><a:lt2><a:srgbClr val="F7F5EF"/></a:lt2>
      <a:accent1><a:srgbClr val="0D766F"/></a:accent1><a:accent2><a:srgbClr val="C9852F"/></a:accent2>
      <a:accent3><a:srgbClr val="3C70A4"/></a:accent3><a:accent4><a:srgbClr val="C85F6A"/></a:accent4>
      <a:accent5><a:srgbClr val="64736B"/></a:accent5><a:accent6><a:srgbClr val="DFF3EF"/></a:accent6>
      <a:hlink><a:srgbClr val="0D766F"/></a:hlink><a:folHlink><a:srgbClr val="07534E"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="EventVault"><a:majorFont><a:latin typeface="Aptos Display"/></a:majorFont><a:minorFont><a:latin typeface="Aptos"/></a:minorFont></a:fontScheme>
    <a:fmtScheme name="EventVault"><a:fillStyleLst/><a:lnStyleLst/><a:effectStyleLst/><a:bgFillStyleLst/></a:fmtScheme>
  </a:themeElements>
</a:theme>"""

slide_layout = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
             xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
             xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>"""

slide_layout_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>"""

slide_master = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
             xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
             xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="1" r:id="rId1"/></p:sldLayoutIdLst>
</p:sldMaster>"""

slide_master_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>"""

content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
""" + "".join(
    f'  <Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>\n'
    for i in range(1, len(slides) + 1)
) + "</Types>"

presentation_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
""" + "".join(
    f'  <Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i}.xml"/>\n'
    for i in range(1, len(slides) + 1)
) + f'  <Relationship Id="rId{len(slides) + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>\n</Relationships>'

presentation = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
                xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
                xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId{len(slides) + 1}"/></p:sldMasterIdLst>
  <p:sldIdLst>
    {''.join(f'<p:sldId id="{255 + i}" r:id="rId{i}"/>' for i in range(1, len(slides) + 1))}
  </p:sldIdLst>
  <p:sldSz cx="{W}" cy="{H}" type="wide"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>"""

OUT.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(OUT, "w", ZIP_DEFLATED) as deck:
    deck.writestr("[Content_Types].xml", content_types)
    deck.writestr("_rels/.rels", rels)
    deck.writestr("ppt/presentation.xml", presentation)
    deck.writestr("ppt/_rels/presentation.xml.rels", presentation_rels)
    deck.writestr("ppt/theme/theme1.xml", theme)
    deck.writestr("ppt/slideMasters/slideMaster1.xml", slide_master)
    deck.writestr("ppt/slideMasters/_rels/slideMaster1.xml.rels", slide_master_rels)
    deck.writestr("ppt/slideLayouts/slideLayout1.xml", slide_layout)
    deck.writestr("ppt/slideLayouts/_rels/slideLayout1.xml.rels", slide_layout_rels)
    for index, parts in enumerate(slides, start=1):
        deck.writestr(f"ppt/slides/slide{index}.xml", slide_xml(parts))
        deck.writestr(
            f"ppt/slides/_rels/slide{index}.xml.rels",
            """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>""",
        )

print(OUT.resolve())
