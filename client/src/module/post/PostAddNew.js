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

Quill.register("modules/imageResize", ImageResize);

const PostAddNew = () => {
  const navigate = useNavigate();

  const [isDefaultImageVisible, setDefaultImageVisible] = useState(true);

  const { addPost } = useContext(postContext);

  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      categoryName: "",
      hot: false,
      image: "",
    },
  });

  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  const addPostHandler = async (values) => {
    console.log(content);
    const { title, categoryName } = values;
    const category = categoryName;
    const image = url;
    const simplePostInfo = { title, category, image, content };
    try {
      const newPostData = await addPost(simplePostInfo);
      if (newPostData["success"]) {
        toast.success(`New post added successfully`);
        navigate("/manage/posts");
      } else {
        toast.error(newPostData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "GoaTalks - Add new post";
  }, []);

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
        title="Write New Post"
        desc="Let your thoughts spreading"
      ></DashboardHeading>
      <form
        className="form"
        onSubmit={handleSubmit(addPostHandler)}
        autoComplete="off"
      >
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
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
            <CloudinaryUploader onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <>
                    {!isDefaultImageVisible && (
                      <div>
                        <button
                          className="p-3 text-sm text-white bg-green-500 rounded-md"
                          onClick={handleOnClick}
                        >
                          Rechoose Image
                        </button>
                      </div>
                    )}

                    {isDefaultImageVisible && (
                      <button
                        className="flex items-start justify-center w-full h-full border-r-2 border-gray-700"
                        onClick={handleOnClick}
                      >
                        <img
                          className="w-[50%] h-[90%]"
                          src={require("../../assets/img-upload.png")}
                          alt="ImgUpload"
                        />
                      </button>
                    )}
                  </>
                );
              }}
            </CloudinaryUploader>
            {url && (
              <>
                <img
                  className="rounded-3xl w-[34rem] h-[20rem] object-cover"
                  src={url}
                  alt="Uploaded resource"
                />
              </>
            )}
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
                  value={content}
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
          Add new post
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;
