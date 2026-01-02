import re

def html_to_markdown(html_content):
    markdown = html_content

    # Convert headings
    markdown = re.sub(r'<h1[^>]*?>(.*?)<\/h1>', r'# \1', markdown)
    markdown = re.sub(r'<h2[^>]*?>(.*?)<\/h2>', r'## \1', markdown)
    markdown = re.sub(r'<h3[^>]*?>(.*?)<\/h3>', r'### \1', markdown)
    markdown = re.sub(r'<h4[^>]*?>(.*?)<\/h4>', r'#### \1', markdown)
    markdown = re.sub(r'<h5[^>]*?>(.*?)<\/h5>', r'##### \1', markdown)
    markdown = re.sub(r'<h6[^>]*?>(.*?)<\/h6>', r'###### \1', markdown)

    # Convert paragraphs
    markdown = re.sub(r'<p[^>]*?>(.*?)<\/p>', r'\1\n\n', markdown)

    # Convert strong/bold
    markdown = re.sub(r'<strong[^>]*?>(.*?)<\/strong>', r'**\1**', markdown)

    # Convert emphasis/italic
    markdown = re.sub(r'<em[^>]*?>(.*?)<\/em>', r'*\1*', markdown)

    # Convert unordered lists
    markdown = re.sub(r'<ul[^>]*?>(.*?)<\/ul>', r'\1', markdown, flags=re.DOTALL)
    markdown = re.sub(r'<li[^>]*?>(.*?)<\/li>', r'- \1\n', markdown)

    # Convert ordered lists
    markdown = re.sub(r'<ol[^>]*?>(.*?)<\/ol>', r'\1', markdown, flags=re.DOTALL)
    markdown = re.sub(r'<li[^>]*?>(.*?)<\/li>', r'1. \1\n', markdown) # Simple conversion, doesn't handle numbering

    # Convert links
    markdown = re.sub(r'<a[^>]*?href=["\'](.*?)["\'][^>]*?>(.*?)<\\/a>', r'[\2](\1)', markdown)

    # Convert code blocks (pre and code tags)
    markdown = re.sub(r'<pre[^>]*?><code[^>]*?>(.*?)<\/code><\/pre>', r'```\n\1\n```\n', markdown, flags=re.DOTALL)
    markdown = re.sub(r'<code[^>]*?>(.*?)<\/code>', r'`\1`', markdown)

    # Convert horizontal rules
    markdown = re.sub(r'<hr[^>]*?>', r'\n---\n', markdown)

    # Convert tables
    def convert_table(match):
        table_content = match.group(1)
        header_match = re.search(r'<thead[^>]*?>(.*?)<\/thead>', table_content, flags=re.DOTALL)
        body_match = re.search(r'<tbody[^>]*?>(.*?)<\/tbody>', table_content, flags=re.DOTALL)

        markdown_table = ""
        if header_match:
            header_rows = re.findall(r'<tr[^>]*?>(.*?)<\/tr>', header_match.group(1), flags=re.DOTALL)
            for row in header_rows:
                headers = re.findall(r'<th[^>]*?>(.*?)<\/th>', row, flags=re.DOTALL)
                markdown_table += '|' + '|'.join([h.strip() for h in headers]) + '|\n'
                markdown_table += '|' + '---' * len(headers) + '|\n'
        if body_match:
            body_rows = re.findall(r'<tr[^>]*?>(.*?)<\/tr>', body_match.group(1), flags=re.DOTALL)
            for row in body_rows:
                cells = re.findall(r'<td[^>]*?>(.*?)<\/td>', row, flags=re.DOTALL)
                markdown_table += '|' + '|'.join([c.strip() for c in cells]) + '|\n'
        return markdown_table

    markdown = re.sub(r'<table[^>]*?>(.*?)<\/table>', convert_table, markdown, flags=re.DOTALL)

    # Remove remaining HTML tags, excluding script and style tags
    markdown = re.sub(r'<(?!script|style)[^>]*?>', '', markdown)

    # Remove script and style tags entirely
    markdown = re.sub(r'<script[^>]*?>.*?<\/script>', '', markdown, flags=re.DOTALL)
    markdown = re.sub(r'<style[^>]*?>.*?<\/style>', '', markdown, flags=re.DOTALL)

    # Remove mermaid diagrams
    markdown = re.sub(r'<div class="hover:bg-night group relative cursor-pointer overflow-x-auto rounded-md bg-[#1f1f1f] p-4 transition-colors" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r\d+:".*?<\/div>', '', markdown, flags=re.DOTALL)

    # Clean up extra newlines and spaces
    markdown = re.sub(r'\n\n\n+', '\n\n', markdown)
    markdown = re.sub(r'\n +', '\n', markdown)
    markdown = markdown.strip()

    return markdown

if __name__ == "__main__":
    with open("docs/src/service/md.html", "r") as f:
        html_content = f.read()

    markdown_content = html_to_markdown(html_content)

    with open("docs/src/service/md.md", "w") as f:
        f.write(markdown_content)
