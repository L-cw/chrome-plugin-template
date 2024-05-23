# 需要通过 sudo bash ./buildzip.sh 来执行
yarn build
echo "build success"
zip -r fedev-tools.zip ./dist
echo "zip success"