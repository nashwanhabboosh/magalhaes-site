"""
extract_feature_titles.py

Run from the directory containing your JS files:
    python extract_feature_titles.py

Recursively finds all .js files, extracts 'title' values from the
'features' array/list in each file, and writes the results to
feature_titles_output.txt in the same directory.
"""

import os
import re


def extract_feature_titles(file_path):
    """
    Parse a JS file and return a list of title values found inside
    a `features` array (objects with a `title:` key).
    """
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Locate the `features` array: find `const features = [` (or `let`/`var`)
    # then grab everything up to the matching closing bracket.
    features_match = re.search(
        r"(?:const|let|var)\s+sections\s*=\s*\[", content
    )
    if not features_match:
        return []

    start = features_match.end()  # position just after the opening `[`

    # Walk forward to find the matching `]`
    depth = 1
    i = start
    while i < len(content) and depth > 0:
        if content[i] == "[":
            depth += 1
        elif content[i] == "]":
            depth -= 1
        i += 1

    features_block = content[start : i - 1]  # contents of the array

    # Extract every `title: '...'` or `title: "..."` inside that block
    titles = re.findall(
        r"""title\s*:\s*(['"])(.*?)\1""",
        features_block,
        re.DOTALL,
    )

    # `titles` is a list of (quote_char, value) tuples; keep only the values
    return [t[1] for t in titles]


def main():
    output_lines = []
    script_name = os.path.basename(__file__)

    # Walk the current directory tree
    for root, dirs, files in os.walk("."):
        # Skip hidden directories (e.g. .git, node_modules)
        dirs[:] = [d for d in dirs if not d.startswith(".") and d != "node_modules"]

        for filename in sorted(files):
            if not filename.endswith(".js"):
                continue
            if filename == script_name:
                continue

            full_path = os.path.join(root, filename)
            titles = extract_feature_titles(full_path)

            if not titles:
                continue  # skip files with no features array

            # Use a relative path as the header (strip leading ./)
            rel_path = os.path.relpath(full_path)
            output_lines.append(rel_path)

            for idx, title in enumerate(titles, start=1):
                output_lines.append(f'  Title {idx}: "{title}"')

            output_lines.append("")  # blank line between files

    if output_lines:
        output_text = "\n".join(output_lines)
        output_file = "feature_titles_output.txt"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(output_text)
        print(f"Done! Results written to {output_file}")
        print()
        print(output_text)
    else:
        print("No 'features' arrays with titles found in any .js files.")


if __name__ == "__main__":
    main()