from __future__ import annotations

import math
from pathlib import Path
from textwrap import wrap


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "deliverables"


BRAND = {
    "name": "PROjuice",
    "tagline": "Real fruit energy. Serious protein.",
    "strap": "Fruit-protein drinks for students, athletes and busy young professionals.",
    "date": "March 17, 2026",
}


BUSINESS = {
    "product_name": "PROjuice Fruit Protein Drink",
    "description": (
        "PROjuice is a chilled 330ml fruit-protein beverage made with real fruit puree, "
        "20g of protein and a cleaner ingredient list than many ready-to-drink shakes. "
        "It is designed for people who want the convenience of a grab-and-go drink without "
        "the heavy, milky or chalky taste often associated with protein products."
    ),
    "flavours": [
        "Mango Charge - tropical mango and passionfruit",
        "Berry Lift - strawberry, blueberry and apple",
        "Apple Lime Pulse - crisp apple, lime and mint",
    ],
    "uvp": "A juice-first protein drink that feels fresh, functional and easy to finish.",
    "target_market": (
        "Primary: active students, gym users and young professionals aged 16-30 who want "
        "an on-the-go breakfast, snack or post-workout recovery option. Secondary: parents, "
        "coaches and cafe owners looking for a healthier grab-and-go fridge item."
    ),
    "survey": [
        "42 local respondents trialled the concept through surveys and tasting conversations.",
        "86% said most protein drinks taste too thick, chalky or artificial.",
        "79% wanted a faster breakfast or recovery option they could drink on the move.",
        "67% said they would buy a fruit-protein drink weekly if the price stayed under NZD 7.",
    ],
    "values": [
        "Freshness first",
        "Real performance",
        "Responsible sourcing",
        "Bold, optimistic branding",
    ],
    "business_objectives": [
        "Launch PROjuice by April 1, 2026 across three channels: pop-up school sales, one gym fridge and online pre-orders.",
        "Sell 2,340 bottles by September 30, 2026 while maintaining an average gross profit of at least NZD 3.45 per bottle.",
        "Secure five repeat stockists by June 30, 2026, including two gyms, one cafe and two education/community sites.",
        "Source at least 25% of fruit input from cosmetically imperfect or surplus local fruit by September 2026.",
    ],
    "marketing_objectives": [
        "Reach 2,340 bottle sales between April 1 and September 30, 2026.",
        "Grow Instagram and TikTok to a combined 1,500 followers and collect 400 QR or email sign-ups by August 31, 2026.",
        "Achieve a repeat purchase rate of 35% by September 2026 through bundle offers and a digital stamp card.",
        "Convert at least five stockists and keep at least three of them reordering every month by the end of Term 3, 2026.",
    ],
    "assumptions": [
        "Customers will value a fruit-forward flavour profile enough to pay more than standard juice.",
        "Local gyms, cafes and school/community sites will support a chilled functional drink from a youth-led brand.",
        "Small-batch chilled production can meet demand without causing frequent out-of-stocks.",
        "Short-form video, sampling and UGC-style content will outperform static poster advertising.",
        "Demand will be strongest around morning routines, lunch breaks and post-workout occasions.",
    ],
}


MARKETING = {
    "market_analysis": [
        "The functional beverage market is crowded, but there is still a clear gap between fresh juice and high-protein RTD shakes.",
        "Many existing protein drinks focus on convenience and macros, yet they often taste heavy, milky or artificial. On the other hand, juices and smoothies taste fresher but usually do not deliver enough protein to support recovery or sustained fullness.",
        "Our primary research showed that convenience, taste and perceived healthiness matter more than extreme bodybuilding positioning. This makes PROjuice relevant for a wider audience than traditional gym shakes.",
    ],
    "customer_profile": [
        "Age 16-30, active, digitally connected and often balancing study, sport, work and commuting.",
        "They buy quick options from school canteens, gyms, cafes and convenience fridges.",
        "They care about visible ingredients, lower sugar, bright flavour and packaging that feels modern rather than clinical.",
        "They often discover new drinks through TikTok, Instagram, peers, coaches and cafe recommendations.",
    ],
    "competitors": [
        {
            "name": "Supermarket RTD protein shakes",
            "strengths": "High protein, convenient, familiar format",
            "weaknesses": "Can feel chalky, dairy-heavy and less fresh",
            "projuice_edge": "PROjuice leads on taste freshness and fruit appeal",
        },
        {
            "name": "Smoothie and juice bars",
            "strengths": "Fresh image, customisable, colourful",
            "weaknesses": "Slower service, inconsistent macros, higher labour cost",
            "projuice_edge": "PROjuice is faster, grab-and-go and protein-consistent",
        },
        {
            "name": "Homemade protein smoothies",
            "strengths": "Flexible and lower cost per serve",
            "weaknesses": "Inconvenient outside home, preparation time needed",
            "projuice_edge": "PROjuice wins on speed, portability and impulse purchase",
        },
    ],
    "pestel": {
        "Political": "Need to comply with food handling, labelling and school sale policies.",
        "Economic": "Fruit and protein costs can move, so margin discipline and waste control matter.",
        "Social": "Consumers want healthier, more natural and more photogenic drinks that fit busy routines.",
        "Technological": "Short-form video, QR ordering and loyalty tracking make small brands more scalable.",
        "Environmental": "Recyclable bottles and surplus-fruit sourcing support a lower-waste story.",
        "Legal": "Claims around nutrition and allergens must be accurate, especially for protein content.",
    },
    "swot": {
        "Strengths": [
            "Fresh positioning between juice and protein shakes",
            "Strong visual brand and social-first content potential",
            "Clear student-athlete use case",
            "Lower-waste sourcing story",
        ],
        "Weaknesses": [
            "New brand with no national awareness",
            "Chilled product needs reliable cold-chain handling",
            "Shelf life is shorter than powder or ambient products",
        ],
        "Opportunities": [
            "Gym and cafe fridge partnerships",
            "Campus and event pop-ups",
            "Seasonal flavours and multipacks",
            "Corporate and sports-team catering",
        ],
        "Threats": [
            "Large beverage brands can copy the format",
            "Fruit input prices may spike",
            "If demand grows too fast, stock-outs could frustrate early fans",
        ],
    },
    "ansoff": {
        "Market Penetration": "Sampling, gym challenges, stamp cards and bundles to lift repeat purchase in existing channels.",
        "Product Development": "Add a lighter breakfast blend, a plant-protein option and seasonal flavours once MVP demand is proven.",
        "Market Development": "Move from school and local gym sales into universities, office fridges and regional cafes.",
        "Diversification": "Extend into smoothie bowls, frozen pops or high-protein fruit shots if the brand earns trust.",
    },
    "marketing_mix": {
        "Product": [
            "330ml chilled bottle with 20g protein and real fruit flavour.",
            "Three launch flavours designed to feel closer to juice than a standard shake.",
            "Recyclable packaging with bright colour coding and simple front-of-pack nutrition cues.",
        ],
        "Price": [
            "Recommended retail price: NZD 6.50 per bottle.",
            "Bundle offer: 3 bottles for NZD 17.50 to encourage repeat use.",
            "Indicative wholesale price: NZD 4.90 for stockists ordering chilled cases.",
        ],
        "Promotion": [
            "Weekly TikTok and Instagram Reels showing flavour, lifestyle and post-workout moments.",
            "Sampling at school events, gyms and weekend markets.",
            "QR-led launch offers, micro-influencer seeding and a 7-day recovery challenge.",
        ],
        "Place": [
            "School or campus pop-up sales during peak breaks.",
            "Local gym fridges and selected independent cafes.",
            "Weekend market stalls and pre-orders through the website or Instagram DMs.",
        ],
    },
    "contingencies": [
        "If sales lag, shift budget into high-conversion tasting events and offer a cheaper 250ml trial bottle.",
        "If one flavour underperforms, reduce its batch size and replace it with the best-performing seasonal fruit blend.",
        "If fridge stockists sell slowly, move more volume into pre-order packs, sports events and school collection points.",
    ],
    "monitoring": [
        "Track weekly sales by channel, flavour, time slot and average order size in a shared dashboard.",
        "Review repeat purchase, sell-through by stockist and social content conversion every Friday.",
        "Run a short customer feedback poll after each tasting event and after every new flavour release.",
        "Use monthly meetings to compare forecast versus actual sales and decide whether to scale, reprice or rebalance channels.",
    ],
}


FINANCE = {
    "unit_costs": [
        ("Fruit puree and juice base", 0.95),
        ("Protein blend", 0.88),
        ("Bottle, label and seal", 0.39),
        ("Chilling and production overhead", 0.23),
    ],
    "retail_price": 6.50,
    "bundle_price": 17.50,
    "wholesale_price": 4.90,
    "sales_forecast": [
        ("Apr", 180),
        ("May", 260),
        ("Jun", 340),
        ("Jul", 430),
        ("Aug", 520),
        ("Sep", 610),
    ],
    "budget": [
        ("Launch tastings and sample cups", 95),
        ("Social ads and boosted content", 150),
        ("Posters, fridge wobblers and QR cards", 120),
        ("Photo and video shoot materials", 80),
        ("Website domain and launch collateral", 45),
        ("Transport and chilled merchandising", 75),
        ("Intro offer and bundle vouchers", 90),
    ],
    "action_plan": [
        ("March", "Finalise recipe, label design, pricing and first stockist conversations."),
        ("April", "Launch on campus, post daily launch-week content and run first tasting stand."),
        ("May", "Secure gym fridge placement and push the 3-pack bundle offer."),
        ("June", "Add cafe channel, publish UGC testimonials and run recovery challenge content."),
        ("July", "Trial winter flavour drop and expand to a second gym or sports club."),
        ("August", "Focus on repeat purchase through loyalty and stockist re-orders."),
        ("September", "Review performance, refine flavours and prepare next-term scale plan."),
    ],
}


LEAN_CANVAS = {
    "Problem": [
        "Most protein drinks taste chalky or artificial.",
        "Juice and smoothies often lack enough protein for recovery.",
        "Busy customers need fast fuel between class, training and work.",
    ],
    "Existing Alternatives": [
        "RTD protein shakes",
        "Smoothie and juice bars",
        "Homemade protein smoothies",
    ],
    "Solution": [
        "A chilled fruit-protein drink with 20g protein.",
        "Three bright flavours that feel refreshing, not heavy.",
        "Ready-to-go bottles for gym bags, fridges and lunch breaks.",
    ],
    "Unique Value Proposition": [
        "Real fruit energy. Serious protein.",
        "PROjuice gives customers the freshness of juice and the function of a protein drink in one bottle.",
    ],
    "Competitive Advantage": [
        "Fruit-first taste positioning",
        "Lower-waste fruit sourcing story",
        "Strong visual branding for social sharing",
        "Fast local batch production and community access",
    ],
    "Target Market": [
        "Active students, gym users and young professionals aged 16-30",
        "People who want convenient breakfast, recovery or snack options",
        "Health-aware buyers who still care about taste and design",
    ],
    "Sales Channels": [
        "School and campus pop-ups",
        "Gym and cafe fridges",
        "Weekend markets",
        "Website and Instagram pre-orders",
    ],
    "Costs": [
        "Variable cost per bottle: NZD 2.45",
        "Launch marketing budget: NZD 655",
        "Chilled transport, sampling and small-batch production overhead",
    ],
    "Revenue Streams": [
        "Single bottle sales at NZD 6.50",
        "3-pack bundles at NZD 17.50",
        "Wholesale cases to stockists",
        "Event catering and launch tastings",
    ],
}


def hex_rgb(value: str) -> tuple[float, float, float]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))


PALETTE = {
    "cream": hex_rgb("#FCF7F0"),
    "sand": hex_rgb("#F4E8D8"),
    "ink": hex_rgb("#17332D"),
    "leaf": hex_rgb("#2E7A58"),
    "mint": hex_rgb("#8FCB9B"),
    "orange": hex_rgb("#F28C28"),
    "coral": hex_rgb("#E2583E"),
    "berry": hex_rgb("#B23A62"),
    "gold": hex_rgb("#F6C453"),
    "slate": hex_rgb("#4D6158"),
    "white": (1.0, 1.0, 1.0),
}


FONT_IDS = {
    "regular": "F1",
    "bold": "F2",
    "italic": "F3",
}


FONT_WIDTH_FACTOR = {
    "regular": 0.54,
    "bold": 0.6,
    "italic": 0.52,
}


def escape_pdf_text(text: str) -> str:
    text = text.replace("\\", "\\\\")
    text = text.replace("(", "\\(")
    text = text.replace(")", "\\)")
    return text


def wrap_paragraphs(text: str, width: float, size: float, font: str = "regular") -> list[str]:
    approx_chars = max(16, int(width / (size * FONT_WIDTH_FACTOR[font])))
    lines: list[str] = []
    for paragraph in text.split("\n"):
        paragraph = " ".join(paragraph.split())
        if not paragraph:
            lines.append("")
            continue
        lines.extend(wrap(paragraph, width=approx_chars, break_long_words=False))
    return lines


class PDFPage:
    def __init__(self, width: float, height: float, background: tuple[float, float, float] | None = None):
        self.width = width
        self.height = height
        self.commands: list[str] = []
        if background:
            self.rect(0, 0, width, height, fill=background, stroke=None)

    @staticmethod
    def _color(value: tuple[float, float, float]) -> str:
        return f"{value[0]:.3f} {value[1]:.3f} {value[2]:.3f}"

    def top_to_pdf(self, y_top: float, height: float = 0) -> float:
        return self.height - y_top - height

    def rect(
        self,
        x: float,
        y_top: float,
        width: float,
        height: float,
        *,
        fill: tuple[float, float, float] | None,
        stroke: tuple[float, float, float] | None = None,
        line_width: float = 1,
    ) -> None:
        y = self.top_to_pdf(y_top, height)
        parts = ["q"]
        parts.append(f"{line_width:.2f} w")
        if fill:
            parts.append(f"{self._color(fill)} rg")
        if stroke:
            parts.append(f"{self._color(stroke)} RG")
        parts.append(f"{x:.2f} {y:.2f} {width:.2f} {height:.2f} re")
        if fill and stroke:
            parts.append("B")
        elif fill:
            parts.append("f")
        else:
            parts.append("S")
        parts.append("Q")
        self.commands.append("\n".join(parts))

    def line(self, x1: float, y1_top: float, x2: float, y2_top: float, color: tuple[float, float, float], width: float = 1) -> None:
        y1 = self.top_to_pdf(y1_top)
        y2 = self.top_to_pdf(y2_top)
        self.commands.append(
            "\n".join(
                [
                    "q",
                    f"{width:.2f} w",
                    f"{self._color(color)} RG",
                    f"{x1:.2f} {y1:.2f} m",
                    f"{x2:.2f} {y2:.2f} l",
                    "S",
                    "Q",
                ]
            )
        )

    def circle(
        self,
        cx: float,
        cy_top: float,
        radius: float,
        *,
        fill: tuple[float, float, float] | None,
        stroke: tuple[float, float, float] | None = None,
        line_width: float = 1,
    ) -> None:
        cy = self.top_to_pdf(cy_top)
        k = 0.5522847498
        ox = radius * k
        oy = radius * k
        x0 = cx - radius
        x1 = cx - radius
        x2 = cx
        x3 = cx + radius
        y0 = cy
        y1 = cy + radius
        y2 = cy - radius
        parts = ["q", f"{line_width:.2f} w"]
        if fill:
            parts.append(f"{self._color(fill)} rg")
        if stroke:
            parts.append(f"{self._color(stroke)} RG")
        parts.extend(
            [
                f"{cx + radius:.2f} {cy:.2f} m",
                f"{cx + radius:.2f} {cy + oy:.2f} {cx + ox:.2f} {y1:.2f} {x2:.2f} {y1:.2f} c",
                f"{cx - ox:.2f} {y1:.2f} {x1:.2f} {cy + oy:.2f} {x1:.2f} {y0:.2f} c",
                f"{x1:.2f} {cy - oy:.2f} {cx - ox:.2f} {y2:.2f} {x2:.2f} {y2:.2f} c",
                f"{cx + ox:.2f} {y2:.2f} {x3:.2f} {cy - oy:.2f} {x3:.2f} {y0:.2f} c",
            ]
        )
        if fill and stroke:
            parts.append("B")
        elif fill:
            parts.append("f")
        else:
            parts.append("S")
        parts.append("Q")
        self.commands.append("\n".join(parts))

    def text(
        self,
        x: float,
        y_top: float,
        text: str,
        *,
        size: float = 12,
        font: str = "regular",
        color: tuple[float, float, float] = PALETTE["ink"],
        leading: float | None = None,
        align: str = "left",
        width: float | None = None,
    ) -> None:
        y = self.top_to_pdf(y_top, size)
        escaped = escape_pdf_text(text)
        shift = 0.0
        if align != "left" and width is not None:
            estimated_width = len(text) * size * FONT_WIDTH_FACTOR[font]
            if align == "center":
                shift = max(0.0, (width - estimated_width) / 2)
            elif align == "right":
                shift = max(0.0, width - estimated_width)
        self.commands.append(
            "\n".join(
                [
                    "BT",
                    f"/{FONT_IDS[font]} {size:.2f} Tf",
                    f"{self._color(color)} rg",
                    f"{x + shift:.2f} {y:.2f} Td",
                    f"{(leading or size * 1.25):.2f} TL",
                    f"({escaped}) Tj",
                    "ET",
                ]
            )
        )

    def paragraph(
        self,
        x: float,
        y_top: float,
        text: str,
        *,
        width: float,
        size: float = 11,
        font: str = "regular",
        color: tuple[float, float, float] = PALETTE["ink"],
        leading: float | None = None,
    ) -> float:
        lines = wrap_paragraphs(text, width, size, font)
        step = leading or size * 1.32
        current = y_top
        for line in lines:
            self.text(x, current, line, size=size, font=font, color=color, leading=step)
            current += step
        return current

    def bullet_list(
        self,
        x: float,
        y_top: float,
        items: list[str],
        *,
        width: float,
        size: float = 10.5,
        color: tuple[float, float, float] = PALETTE["ink"],
        accent: tuple[float, float, float] = PALETTE["coral"],
    ) -> float:
        current = y_top
        for item in items:
            self.circle(x + 5, current + 8, 2.5, fill=accent, stroke=None)
            current = self.paragraph(x + 14, current, item, width=width - 14, size=size, color=color)
            current += 4
        return current

    def footer(self, page_number: int, total_pages: int, label: str = "PROjuice Marketing Report") -> None:
        self.line(40, self.height - 34, self.width - 40, self.height - 34, PALETTE["sand"], 1)
        self.text(40, self.height - 28, label, size=9.5, font="regular", color=PALETTE["slate"])
        self.text(self.width - 120, self.height - 28, f"Page {page_number} of {total_pages}", size=9.5, font="regular", color=PALETTE["slate"], width=80, align="right")

    def stream(self) -> bytes:
        return "\n".join(self.commands).encode("latin-1", "replace")


class PDFWriter:
    def __init__(self):
        self.objects: list[bytes | None] = []

    def reserve_object(self) -> int:
        self.objects.append(None)
        return len(self.objects)

    def add_object(self, payload: bytes) -> int:
        self.objects.append(payload)
        return len(self.objects)

    def set_object(self, number: int, payload: bytes) -> None:
        self.objects[number - 1] = payload

    def build(self, pages: list[PDFPage], out_path: Path) -> None:
        self.objects = []
        font_regular = self.add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
        font_bold = self.add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
        font_italic = self.add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >>")
        pages_obj = self.reserve_object()
        page_refs: list[int] = []
        for page in pages:
            content = page.stream()
            content_obj = self.add_object(
                b"<< /Length "
                + str(len(content)).encode("ascii")
                + b" >>\nstream\n"
                + content
                + b"\nendstream"
            )
            page_payload = (
                f"<< /Type /Page /Parent {pages_obj} 0 R /MediaBox [0 0 {page.width:.2f} {page.height:.2f}] "
                f"/Resources << /Font << /F1 {font_regular} 0 R /F2 {font_bold} 0 R /F3 {font_italic} 0 R >> >> "
                f"/Contents {content_obj} 0 R >>"
            ).encode("latin-1")
            page_refs.append(self.add_object(page_payload))

        kids = " ".join(f"{ref} 0 R" for ref in page_refs)
        self.set_object(pages_obj, f"<< /Type /Pages /Count {len(page_refs)} /Kids [{kids}] >>".encode("latin-1"))
        catalog = self.add_object(f"<< /Type /Catalog /Pages {pages_obj} 0 R >>".encode("latin-1"))

        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = [0]
        for index, obj in enumerate(self.objects, start=1):
            if obj is None:
                raise ValueError(f"Object {index} was not populated")
            offsets.append(len(out))
            out.extend(f"{index} 0 obj\n".encode("ascii"))
            out.extend(obj)
            out.extend(b"\nendobj\n")

        xref_offset = len(out)
        out.extend(f"xref\n0 {len(self.objects) + 1}\n".encode("ascii"))
        out.extend(b"0000000000 65535 f \n")
        for offset in offsets[1:]:
            out.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
        out.extend(
            (
                f"trailer\n<< /Size {len(self.objects) + 1} /Root {catalog} 0 R >>\n"
                f"startxref\n{xref_offset}\n%%EOF"
            ).encode("ascii")
        )
        out_path.write_bytes(out)


def draw_badge(page: PDFPage, x: float, y_top: float, width: float, label: str, value: str, accent: tuple[float, float, float]) -> None:
    page.rect(x, y_top, width, 72, fill=PALETTE["white"], stroke=None)
    page.rect(x, y_top, 7, 72, fill=accent, stroke=None)
    page.text(x + 18, y_top + 16, label.upper(), size=8.5, font="bold", color=PALETTE["slate"])
    page.paragraph(x + 18, y_top + 30, value, width=width - 28, size=12, font="bold", color=PALETTE["ink"])


def draw_section_heading(page: PDFPage, number: str, title: str, x: float, y_top: float, width: float) -> float:
    page.text(x, y_top, number, size=11, font="bold", color=PALETTE["coral"])
    page.text(x + 28, y_top - 3, title, size=18, font="bold", color=PALETTE["ink"])
    page.line(x + 28, y_top + 22, x + width, y_top + 22, PALETTE["sand"], 1.3)
    return y_top + 34


def draw_small_title(page: PDFPage, title: str, x: float, y_top: float, width: float, accent: tuple[float, float, float] = PALETTE["orange"]) -> float:
    page.rect(x, y_top, width, 26, fill=accent, stroke=None)
    page.text(x + 12, y_top + 7, title, size=12, font="bold", color=PALETTE["white"])
    return y_top + 38


def make_report_pages() -> list[PDFPage]:
    pages: list[PDFPage] = []
    width, height = 595.0, 842.0

    cover = PDFPage(width, height, background=PALETTE["cream"])
    cover.rect(0, 0, width, 110, fill=PALETTE["ink"], stroke=None)
    cover.rect(0, 760, width, 82, fill=PALETTE["sand"], stroke=None)
    cover.circle(485, 185, 90, fill=PALETTE["orange"], stroke=None)
    cover.circle(420, 245, 56, fill=PALETTE["berry"], stroke=None)
    cover.circle(525, 285, 42, fill=PALETTE["mint"], stroke=None)
    cover.rect(375, 165, 98, 180, fill=PALETTE["white"], stroke=PALETTE["ink"], line_width=2.2)
    cover.rect(392, 140, 64, 28, fill=PALETTE["leaf"], stroke=None)
    cover.rect(404, 114, 40, 22, fill=PALETTE["orange"], stroke=None)
    cover.rect(407, 78, 34, 42, fill=PALETTE["coral"], stroke=None)
    cover.text(44, 48, "AS91384 (3.6) Marketing Report", size=10, font="bold", color=PALETTE["white"])
    cover.text(44, 118, BRAND["name"], size=33, font="bold", color=PALETTE["ink"])
    cover.paragraph(44, 168, BRAND["tagline"], width=270, size=20, font="bold", color=PALETTE["leaf"])
    cover.paragraph(44, 235, BRAND["strap"], width=300, size=13, color=PALETTE["slate"])
    draw_badge(cover, 44, 320, 156, "Protein", "20g per bottle", PALETTE["leaf"])
    draw_badge(cover, 214, 320, 156, "Format", "330ml chilled bottle", PALETTE["berry"])
    draw_badge(cover, 384, 320, 156, "Positioning", "Juice-first taste", PALETTE["orange"])
    cover.rect(44, 430, 498, 206, fill=PALETTE["white"], stroke=None)
    cover.text(66, 455, "What This Report Covers", size=15, font="bold", color=PALETTE["ink"])
    cover.bullet_list(
        66,
        487,
        [
            "A full marketing report structured to match the 17-point class outline shown in the course handout.",
            "A clear strategy for launching PROjuice as a fruit-protein beverage with strong branding, a realistic channel plan and actionable sales targets.",
            "Integrated ideas from the YES exemplar, but adapted to suit the product concept and the required marketing-report format.",
        ],
        width=450,
        size=11,
    )
    cover.text(44, 784, f"Prepared: {BRAND['date']}", size=10, font="regular", color=PALETTE["slate"])
    cover.text(362, 784, "PROjuice Marketing Report", size=10, font="bold", color=PALETTE["slate"])
    pages.append(cover)

    toc = PDFPage(width, height, background=PALETTE["cream"])
    toc.text(44, 52, "Contents and Executive Snapshot", size=26, font="bold", color=PALETTE["ink"])
    toc.paragraph(
        44,
        94,
        "The official YES exemplar is a quality reference, but this report follows the fuller 17-point marketing structure shown in class. "
        "That means the final document includes market analysis, PESTEL, Ansoff, a marketing budget and a sales-monitoring plan.",
        width=500,
        size=11.5,
        color=PALETTE["slate"],
    )
    toc.rect(44, 152, 302, 520, fill=PALETTE["white"], stroke=None)
    toc.rect(366, 152, 176, 286, fill=PALETTE["white"], stroke=None)
    toc.text(60, 174, "Report Structure", size=16, font="bold", color=PALETTE["ink"])
    items = [
        "1. Description of product or service",
        "2. Vision, mission statement and values",
        "3. SMART business objectives",
        "4. Market analysis",
        "5. Customer analysis",
        "6. Competitor analysis",
        "7. PESTEL analysis",
        "8. SWOT analysis",
        "9. Ansoff matrix",
        "10. Marketing assumptions",
        "11. Marketing objectives",
        "12. Marketing mix",
        "13. Sales forecast",
        "14. Contingency plans",
        "15. Marketing action plan",
        "16. Marketing budget",
        "17. Plan for monitoring sales",
    ]
    current = 206
    for item in items:
        toc.text(62, current, item, size=11.3, font="regular", color=PALETTE["ink"])
        current += 24

    toc.text(382, 174, "Brand Snapshot", size=16, font="bold", color=PALETTE["ink"])
    draw_badge(toc, 382, 208, 144, "UVP", "Fresh like juice, functional like a protein drink", PALETTE["leaf"])
    draw_badge(toc, 382, 292, 144, "Launch Goal", "2,340 bottles in 6 months", PALETTE["orange"])
    draw_badge(toc, 382, 376, 144, "Channels", "Campus, gyms, cafes and pre-orders", PALETTE["berry"])

    toc.rect(366, 458, 176, 124, fill=PALETTE["white"], stroke=None)
    toc.text(382, 478, "Pilot Findings", size=13, font="bold", color=PALETTE["ink"])
    toc.text(382, 504, "42", size=18, font="bold", color=PALETTE["berry"])
    toc.paragraph(418, 502, "respondents tested the concept", width=100, size=8.9, color=PALETTE["slate"])
    toc.text(382, 534, "86%", size=18, font="bold", color=PALETTE["orange"])
    toc.paragraph(418, 532, "disliked chalky or artificial protein drinks", width=100, size=8.9, color=PALETTE["slate"])
    toc.text(382, 564, "79%", size=18, font="bold", color=PALETTE["leaf"])
    toc.paragraph(418, 562, "wanted a faster on-the-go breakfast or recovery option", width=100, size=8.9, color=PALETTE["slate"])

    toc.rect(366, 602, 176, 70, fill=PALETTE["white"], stroke=None)
    toc.text(382, 620, "Core Message", size=13, font="bold", color=PALETTE["ink"])
    toc.paragraph(382, 644, BUSINESS["uvp"], width=144, size=10.7, font="bold", color=PALETTE["leaf"])
    pages.append(toc)

    intro = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(intro, "1", "Description of Product or Service", 44, 46, 500)
    y = intro.paragraph(44, y, BUSINESS["description"], width=500, size=11.5)
    y += 12
    intro.text(44, y, "Launch flavours", size=12.5, font="bold", color=PALETTE["ink"])
    y = intro.bullet_list(44, y + 18, BUSINESS["flavours"], width=500, size=10.8)

    y += 12
    y = draw_section_heading(intro, "2", "Vision, Mission Statement and Values", 44, y, 500)
    intro.text(44, y, "Vision", size=12.5, font="bold", color=PALETTE["leaf"])
    intro.paragraph(44, y + 18, "To make functional drinks feel naturally energising, fresh and easy to love.", width=500, size=11.2)
    intro.text(44, y + 74, "Mission", size=12.5, font="bold", color=PALETTE["leaf"])
    intro.paragraph(
        44,
        y + 92,
        "To deliver a fruit-forward protein drink that combines practical nutrition, bold branding and lower-waste local sourcing.",
        width=500,
        size=11.2,
    )
    intro.text(44, y + 150, "Values", size=12.5, font="bold", color=PALETTE["leaf"])
    intro.bullet_list(44, y + 168, BUSINESS["values"], width=500, size=10.8)

    y2 = 612
    y2 = draw_section_heading(intro, "3", "SMART Business Objectives", 44, y2, 500)
    intro.bullet_list(44, y2, BUSINESS["business_objectives"], width=500, size=10.8, accent=PALETTE["berry"])
    pages.append(intro)

    market = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(market, "4", "Market Analysis", 44, 46, 500)
    market.bullet_list(44, y, MARKETING["market_analysis"], width=500, size=10.8, accent=PALETTE["orange"])
    market.rect(44, 280, 498, 104, fill=PALETTE["white"], stroke=None)
    draw_badge(market, 58, 296, 144, "Pain Point", "86% dislike chalky shakes", PALETTE["berry"])
    draw_badge(market, 220, 296, 144, "Need State", "79% want on-the-go nutrition", PALETTE["leaf"])
    draw_badge(market, 382, 296, 144, "Price Window", "67% accept NZD 6-7", PALETTE["orange"])

    y = draw_section_heading(market, "5", "Customer Analysis", 44, 420, 500)
    market.rect(44, 456, 246, 254, fill=PALETTE["white"], stroke=None)
    market.rect(308, 456, 234, 254, fill=PALETTE["white"], stroke=None)
    market.text(58, 476, "Target Customer Profile", size=14, font="bold", color=PALETTE["ink"])
    market.bullet_list(58, 504, MARKETING["customer_profile"], width=210, size=10.2, accent=PALETTE["leaf"])
    market.text(322, 476, "Core Persona", size=14, font="bold", color=PALETTE["ink"])
    market.paragraph(
        322,
        504,
        "The Busy Active Achiever\n\n"
        "A 19-year-old student or 25-year-old young professional who moves between class, work, training and social plans. "
        "They want quick energy, enough protein to stay full, and packaging that feels modern enough to post online. "
        "They are not necessarily hardcore bodybuilders; they simply want a practical, healthier option that still tastes great.",
        width=190,
        size=10.2,
    )
    pages.append(market)

    audit = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(audit, "6", "Competitor Analysis", 44, 46, 500)
    card_top = y
    accents = [PALETTE["orange"], PALETTE["berry"], PALETTE["leaf"]]
    for row, accent in zip(MARKETING["competitors"], accents):
        audit.rect(44, card_top, 498, 154, fill=PALETTE["white"], stroke=None)
        audit.rect(44, card_top, 498, 28, fill=accent, stroke=None)
        audit.text(58, card_top + 8, row["name"], size=12.4, font="bold", color=PALETTE["white"])
        audit.text(58, card_top + 46, "Strengths", size=10, font="bold", color=PALETTE["ink"])
        audit.paragraph(58, card_top + 62, row["strengths"], width=132, size=9.8, color=PALETTE["slate"])
        audit.text(220, card_top + 46, "Weaknesses", size=10, font="bold", color=PALETTE["ink"])
        audit.paragraph(220, card_top + 62, row["weaknesses"], width=132, size=9.8, color=PALETTE["slate"])
        audit.text(382, card_top + 46, "PROjuice edge", size=10, font="bold", color=PALETTE["ink"])
        audit.paragraph(382, card_top + 62, row["projuice_edge"], width=130, size=9.8, font="bold", color=PALETTE["leaf"])
        card_top += 170
    pages.append(audit)

    pestel_page = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(pestel_page, "7", "PESTEL Analysis", 44, 46, 500)
    pestel_items = list(MARKETING["pestel"].items())
    box_width = 238
    box_height = 116
    start_y = y
    for idx, (label, body) in enumerate(pestel_items):
        row = idx // 2
        col = idx % 2
        x = 44 + col * 258
        y_box = start_y + row * 132
        pestel_page.rect(x, y_box, box_width, box_height, fill=PALETTE["white"], stroke=None)
        pestel_page.text(x + 14, y_box + 16, label, size=12.5, font="bold", color=PALETTE["berry"])
        pestel_page.paragraph(x + 14, y_box + 40, body, width=box_width - 28, size=9.8, color=PALETTE["slate"])
    pages.append(pestel_page)

    swot_page = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(swot_page, "8", "SWOT Analysis", 44, 46, 500)
    quadrant_data = list(MARKETING["swot"].items())
    quad_positions = [
        (44, y, PALETTE["leaf"]),
        (302, y, PALETTE["orange"]),
        (44, y + 202, PALETTE["berry"]),
        (302, y + 202, PALETTE["gold"]),
    ]
    for (label, items), (x, y_box, accent) in zip(quadrant_data, quad_positions):
        swot_page.rect(x, y_box, 240, 178, fill=PALETTE["white"], stroke=None)
        swot_page.text(x + 14, y_box + 16, label, size=13.5, font="bold", color=accent)
        swot_page.bullet_list(x + 14, y_box + 44, items, width=210, size=9.7, accent=accent)
    pages.append(swot_page)

    strategy_foundation = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(strategy_foundation, "9", "Ansoff Matrix", 44, 46, 500)
    strategy_foundation.rect(44, y, 498, 272, fill=PALETTE["white"], stroke=None)
    strategy_foundation.line(293, y + 24, 293, y + 248, PALETTE["sand"], 1.2)
    strategy_foundation.line(60, y + 136, 526, y + 136, PALETTE["sand"], 1.2)
    ansoff_positions = [
        (60, y + 34),
        (310, y + 34),
        (60, y + 146),
        (310, y + 146),
    ]
    for (title, body), (x, y_box) in zip(MARKETING["ansoff"].items(), ansoff_positions):
        strategy_foundation.text(x, y_box, title, size=10.8, font="bold", color=PALETTE["ink"])
        strategy_foundation.paragraph(x, y_box + 22, body, width=200, size=9.4, color=PALETTE["slate"])

    y = draw_section_heading(strategy_foundation, "10", "Marketing Assumptions", 44, 392, 500)
    strategy_foundation.rect(44, y, 498, 280, fill=PALETTE["white"], stroke=None)
    strategy_foundation.bullet_list(58, y + 22, BUSINESS["assumptions"], width=454, size=10.4, accent=PALETTE["orange"])
    pages.append(strategy_foundation)

    mix_a = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(mix_a, "10", "Marketing Assumptions", 44, 46, 500)
    mix_a.bullet_list(44, y, BUSINESS["assumptions"], width=500, size=10.2, accent=PALETTE["orange"])
    y = draw_section_heading(mix_a, "11", "Marketing Objectives", 44, 260, 500)
    mix_a.bullet_list(44, y, BUSINESS["marketing_objectives"], width=500, size=10.2, accent=PALETTE["berry"])
    y = draw_section_heading(mix_a, "12", "Marketing Mix: Product and Price", 44, 508, 500)
    mix_a.rect(44, y, 240, 176, fill=PALETTE["white"], stroke=None)
    mix_a.rect(302, y, 240, 176, fill=PALETTE["white"], stroke=None)
    mix_a.text(58, y + 16, "Product", size=14, font="bold", color=PALETTE["leaf"])
    mix_a.bullet_list(58, y + 42, MARKETING["marketing_mix"]["Product"], width=210, size=9.4, accent=PALETTE["leaf"])
    mix_a.text(316, y + 16, "Price", size=14, font="bold", color=PALETTE["orange"])
    mix_a.bullet_list(316, y + 42, MARKETING["marketing_mix"]["Price"], width=210, size=9.4, accent=PALETTE["orange"])
    unit_cost = sum(cost for _, cost in FINANCE["unit_costs"])
    mix_a.rect(44, y + 194, 498, 78, fill=PALETTE["sand"], stroke=None)
    mix_a.text(58, y + 212, "Gross Margin Snapshot", size=11.5, font="bold", color=PALETTE["ink"])
    mix_a.paragraph(
        58,
        y + 236,
        f"Variable cost per bottle: NZD {unit_cost:.2f}\nRetail price: NZD {FINANCE['retail_price']:.2f}\nGross profit per direct sale: NZD {FINANCE['retail_price'] - unit_cost:.2f}",
        width=454,
        size=10.0,
        font="bold",
        color=PALETTE["slate"],
    )
    pages.append(mix_a)

    mix_b = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(mix_b, "12", "Marketing Mix: Promotion and Place", 44, 46, 500)
    mix_b.rect(44, y, 240, 248, fill=PALETTE["white"], stroke=None)
    mix_b.rect(302, y, 240, 248, fill=PALETTE["white"], stroke=None)
    mix_b.text(58, y + 16, "Promotion", size=14, font="bold", color=PALETTE["berry"])
    mix_b.bullet_list(58, y + 42, MARKETING["marketing_mix"]["Promotion"], width=210, size=10.0, accent=PALETTE["berry"])
    mix_b.text(316, y + 16, "Place", size=14, font="bold", color=PALETTE["leaf"])
    mix_b.bullet_list(316, y + 42, MARKETING["marketing_mix"]["Place"], width=210, size=10.0, accent=PALETTE["leaf"])

    y = draw_section_heading(mix_b, "13", "Sales Forecast", 44, 380, 500)
    mix_b.rect(44, y, 498, 312, fill=PALETTE["white"], stroke=None)
    chart_x = 68
    chart_y = y + 34
    chart_w = 446
    chart_h = 182
    mix_b.line(chart_x, chart_y + chart_h, chart_x + chart_w, chart_y + chart_h, PALETTE["sand"], 1.2)
    mix_b.line(chart_x, chart_y + 20, chart_x, chart_y + chart_h, PALETTE["sand"], 1.2)
    max_units = max(units for _, units in FINANCE["sales_forecast"])
    bar_width = 46
    gap = 26
    for idx, (month, units) in enumerate(FINANCE["sales_forecast"]):
        bar_height = (units / max_units) * 150
        x = chart_x + 18 + idx * (bar_width + gap)
        y_bar = chart_y + chart_h - bar_height
        color = [PALETTE["orange"], PALETTE["berry"], PALETTE["leaf"]][idx % 3]
        mix_b.rect(x, y_bar, bar_width, bar_height, fill=color, stroke=None)
        mix_b.text(x, chart_y + chart_h + 10, month, size=10, font="bold", color=PALETTE["slate"], width=bar_width, align="center")
        mix_b.text(x - 2, y_bar - 18, str(units), size=9.4, font="bold", color=PALETTE["ink"], width=bar_width + 4, align="center")
    total_units = sum(units for _, units in FINANCE["sales_forecast"])
    mix_b.paragraph(
        60,
        y + 242,
        f"Forecast rationale: sales ramp up as awareness, stockist coverage and repeat purchase improve. "
        f"The first six months are forecast to deliver {total_units} bottles, with the strongest months expected once gym, cafe and campus channels are all active.",
        width=468,
        size=10.6,
        color=PALETTE["slate"],
    )
    pages.append(mix_b)

    plan = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(plan, "14", "Contingency Plans", 44, 46, 500)
    plan.bullet_list(44, y, MARKETING["contingencies"], width=500, size=10.8, accent=PALETTE["orange"])
    y = draw_section_heading(plan, "15", "Marketing Action Plan", 44, 248, 500)
    plan.rect(44, y, 498, 510, fill=PALETTE["white"], stroke=None)
    plan.text(58, y + 18, "Month", size=11.2, font="bold", color=PALETTE["ink"])
    plan.text(152, y + 18, "Actions", size=11.2, font="bold", color=PALETTE["ink"])
    current = y + 52
    for month, actions in FINANCE["action_plan"]:
        plan.line(58, current - 8, 526, current - 8, PALETTE["sand"], 1)
        plan.text(58, current, month, size=10.2, font="bold", color=PALETTE["berry"])
        plan.paragraph(152, current, actions, width=350, size=9.7, color=PALETTE["slate"])
        current += 68
    pages.append(plan)

    controls = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(controls, "16", "Marketing Budget", 44, 46, 500)
    controls.rect(44, y, 498, 340, fill=PALETTE["white"], stroke=None)
    controls.text(58, y + 18, "Budget item", size=11, font="bold", color=PALETTE["ink"])
    controls.text(470, y + 18, "NZD", size=11, font="bold", color=PALETTE["ink"], width=50, align="right")
    current = y + 48
    total_budget = 0
    for item, amount in FINANCE["budget"]:
        total_budget += amount
        controls.line(58, current - 8, 520, current - 8, PALETTE["sand"], 1)
        controls.paragraph(58, current, item, width=360, size=9.8)
        controls.text(458, current, f"{amount}", size=10.1, font="bold", color=PALETTE["slate"], width=60, align="right")
        current += 36
    controls.line(58, current - 8, 520, current - 8, PALETTE["ink"], 1.1)
    controls.text(58, current, "Total marketing budget", size=11.4, font="bold", color=PALETTE["ink"])
    controls.text(454, current, f"{total_budget}", size=11.4, font="bold", color=PALETTE["leaf"], width=64, align="right")
    controls.rect(58, y + 252, 460, 62, fill=PALETTE["sand"], stroke=None)
    controls.paragraph(
        72,
        y + 270,
        "Budget priority is front-loaded into launch sampling and social content because early taste proof and visual storytelling are the fastest ways to earn trial.",
        width=432,
        size=9.2,
        font="bold",
        color=PALETTE["slate"],
    )
    pages.append(controls)

    monitoring = PDFPage(width, height, background=PALETTE["cream"])
    y = draw_section_heading(monitoring, "17", "Plan for Monitoring Sales", 44, 46, 500)
    monitoring.rect(44, y, 498, 340, fill=PALETTE["white"], stroke=None)
    monitoring.bullet_list(58, y + 28, MARKETING["monitoring"], width=454, size=10.3, accent=PALETTE["leaf"])
    monitoring.rect(58, y + 206, 454, 104, fill=PALETTE["sand"], stroke=None)
    monitoring.text(72, y + 224, "Weekly Dashboard Fields", size=11.5, font="bold", color=PALETTE["ink"])
    monitoring.paragraph(
        72,
        y + 248,
        "Units sold by flavour | units sold by channel | conversion from sampling | repeat purchase | stockist sell-through | social saves, clicks and QR scans",
        width=428,
        size=9.6,
        color=PALETTE["slate"],
    )
    pages.append(monitoring)

    total = len(pages)
    for idx, page in enumerate(pages, start=1):
        page.footer(idx, total)
    return pages


def make_canvas_pages() -> list[PDFPage]:
    width, height = 842.0, 595.0
    page = PDFPage(width, height, background=PALETTE["cream"])
    page.rect(0, 0, width, 82, fill=PALETTE["ink"], stroke=None)
    page.text(34, 28, "YES Lean Canvas | PROjuice", size=12, font="bold", color=PALETTE["white"])
    page.text(34, 92, BRAND["name"], size=26, font="bold", color=PALETTE["ink"])
    page.text(240, 97, BRAND["tagline"], size=15, font="bold", color=PALETTE["leaf"])
    page.text(34, 124, "One-page business model summary for a fruit-protein beverage launch.", size=10.5, font="regular", color=PALETTE["slate"])

    boxes = [
        ("Problem", 34, 156, 236, 120, PALETTE["orange"]),
        ("Existing Alternatives", 34, 290, 236, 120, PALETTE["berry"]),
        ("Solution", 286, 156, 236, 120, PALETTE["leaf"]),
        ("Unique Value Proposition", 286, 290, 236, 120, PALETTE["ink"]),
        ("Competitive Advantage", 286, 424, 236, 120, PALETTE["gold"]),
        ("Target Market", 538, 156, 270, 120, PALETTE["coral"]),
        ("Sales Channels", 538, 290, 270, 120, PALETTE["mint"]),
        ("Costs", 34, 424, 236, 120, PALETTE["slate"]),
        ("Revenue Streams", 538, 424, 270, 120, PALETTE["leaf"]),
    ]

    for title, x, y, w, h, accent in boxes:
        page.rect(x, y, w, h, fill=PALETTE["white"], stroke=None)
        page.rect(x, y, w, 24, fill=accent, stroke=None)
        page.text(x + 12, y + 6, title, size=11.4, font="bold", color=PALETTE["white"])
        page.bullet_list(x + 12, y + 38, LEAN_CANVAS[title], width=w - 24, size=9.0, accent=accent)

    page.rect(538, 84, 270, 74, fill=PALETTE["white"], stroke=None)
    page.text(552, 99, "Launch Targets", size=11.2, font="bold", color=PALETTE["ink"])
    page.paragraph(
        552,
        118,
        "2,340 bottles by Sep 30, 2026 | 5 repeat stockists | 35% repeat purchase rate",
        width=236,
        size=9.5,
        font="bold",
        color=PALETTE["slate"],
    )
    page.footer(1, 1, "PROjuice Lean Canvas")
    return [page]


def generate() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    report_writer = PDFWriter()
    report_writer.build(make_report_pages(), OUT_DIR / "PROjuice-Marketing-Report-v3.pdf")

    canvas_writer = PDFWriter()
    canvas_writer.build(make_canvas_pages(), OUT_DIR / "PROjuice-Lean-Canvas-v3.pdf")


if __name__ == "__main__":
    generate()
