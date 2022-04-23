const { Storage } = require("@google-cloud/storage");

const sharp = require("sharp");

//기본 버전에서는 Storage 사용이 안된다 5.18.1 버전을 사용해야 사용 가능
//배포를 새로 하면 기존에 작동하던 트리거는 종료가 된다
//썸네일 전용 버킷을 새로 생성하면 트리거가 계속 돌지 않기 때문에 위와 같이 조건을 달아주지 않아도 괜찮다

exports.generateThumbnails = async (img) => {
  const imgPath = img.name;  //filename
  const imgBucket = img.bucket; //filebucket
  const storage = new Storage().bucket(imgBucket);
  const sizes = [
    { size: 320, name: "s" },
    { size: 640, name: "m" },
    { size: 1280, name: "l" },
  ];

  if (imgPath.includes("thumb/")) return;

  const result = await Promise.all(
    // Promise.all은 안에 배열이 들어가있어야 한다. 배열 안의 promise들이 끝나면 한번에 전송된다
    sizes.map((el) => {
      return new Promise((resolve, reject) => {
        storage
          .file(imgPath) 
          .createReadStream() // 1. 기존의 파일을 읽어오기
          .pipe(sharp().resize({ width: el.size })) //2. img 안에 있는 파일을 활용하여 썸네일 생성
          .pipe(storage.file(`thumb/${el.name}/${imgPath}`)
          .createWriteStream()) // 3. 생성된 썸네일을 업로드
          .on("finish", () => resolve(`thumb/${el.name}/${imgPath}`))
          .on("error", (error) => reject(error));
      });
    })
  );
};

