#!/bin/bash

mkdir "$1"
cd "$1"
title="${1#*:}"

cat > index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <script src="./script.js"></script>
</body>
</html>
EOF

cat > style.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
EOF

cat > script.js << 'EOF'
EOF
