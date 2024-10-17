import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postContext } from "../../contexts/postContext";
import { useNavigate } from "react-router-dom";
import CloudinaryUploader from "components/image/CloudinaryUploader";
import { categories } from "utils/constants";
import ImageResize from "quill-image-resize-module-react";
import { useParams } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

const PostUpdate = () => {
  const [isDefaultImageVisible, setDefaultImageVisible] = useState(true);

  const { slug } = useParams();
  const {
    postState: { detailpost },
    getDetailedPost,
    updatePost,
  } = useContext(postContext);
  const id = slug;
  const detailid = { id };
  useState(() => getDetailedPost(detailid), []);

  const { control, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      status: 2,
      categoryId: "",
      categoryName: "",
      hot: false,
      image: "",
    },
  });

  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentt, setContent] = useState("");
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const navigate = useNavigate();

  const updatePostHandler = async (values) => {
    const currentPost = await getDetailedPost(detailid);
    let { title, categoryName } = values;
    title = title == "" ? currentPost.posts[0].title : title;
    let category =
      categoryName == "" ? currentPost.posts[0].category : categoryName;
    let image;
    // console.log(values)
    image = url == undefined ? currentPost.posts[0].image : url;
    let content = contentt == "" ? currentPost.posts[0].content : contentt;
    console.log(content);
    const updatePostInfo = { title, category, image, content };
    try {
      const updatePostData = await updatePost(updatePostInfo, id);
      if (updatePostData["success"]) {
        toast.success("Post edited successfully");
        setTimeout(1500);
        // window.location.reload();
        navigate("/manage/posts");
      } else {
        toast.error(updatePostData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "GoaTalks - Add new post";
  }, []);

  useEffect(() => {
    if (detailpost.length > 0) {
      const post = detailpost[0];
      setContent(post.content || "");
    }
  }, [detailpost]);

  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
    setValue("categoryName", item.name);
    setSelectCategory(item);
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
    console.log(result);
    setValue("image", url);
    // Hide the default image after upload
    setDefaultImageVisible(false);
  }

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
      <DashboardHeading
        title="Update Post"
        desc="Update Your Post Easily Here"
      ></DashboardHeading>
      {detailpost.map((post) => (
        <form
          className="form"
          onSubmit={handleSubmit(updatePostHandler)}
          autoComplete="off"
        >
          <div className="form-layout">
            <Field>
              <Label>Title</Label>
              <Input
                control={control}
                placeholder={post.title}
                name="title"
              ></Input>
            </Field>
            <Field>
              <Label>Category</Label>
              <Dropdown>
                <Dropdown.Select placeholder={post.category}></Dropdown.Select>
                <Dropdown.List>
                  {categories.length > 0 &&
                    categories.slice(1).map((item) => (
                      <Dropdown.Option
                        key={item.id}
                        onClick={() => handleClickOption(item)}
                      >
                        {item.name}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
              {selectCategory?.name && (
                <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                  {selectCategory?.name}
                </span>
              )}
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Image</Label>
              <img
                className="w-[20rem] h-[15rem] object-cover mb-3 rounded-3xl"
                src={url ? url : post.image}
                alt="UserAvatar"
              ></img>
              <CloudinaryUploader onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button
                      className="p-3 text-sm text-white bg-green-500 rounded-md"
                      onClick={handleOnClick}
                    >
                      Change Thumbnail
                    </button>
                  );
                }}
              </CloudinaryUploader>
            </Field>
          </div>
          <div className="solo-form-layout">
            <div className="mb-10">
              <Field>
                <Label>Content</Label>
                <div className="w-full entry-content">
                  <ReactQuill
                    modules={modules}
                    name="content"
                    value={contentt}
                    onChange={setContent}
                  />
                </div>
              </Field>
            </div>
          </div>
          <Button
            type="submit"
            className="mx-auto w-[250px]"
            isLoading={loading}
            disabled={loading}
          >
            Update Post
          </Button>
        </form>
      ))}
    </>
  );
};

export default PostUpdate;
