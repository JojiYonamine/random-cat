import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl); //useStateは2変数を返す関数、初期値として、""が渡されている。setImageUrlはimageUrl の値を更新するための関数
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true); //loadingにtrueが渡される。
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>see other cats</button>
      <div className={styles.frame}>{loading || <img src={imageUrl} />}</div>
    </div>
  );

  //return <div>{loading || <img src={imageUrl} />}</div>;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props>  = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
