import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FaCamera, FaImage } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function GetImagePreview({
  loading,
  name,
  control,
  label,
  defaultValue = "",
  className,
  cameraIcon = false,
  cameraSize = 40,
  image = undefined
}) {
  const [preview, setPreview] = useState(null);

  const handlePreview = (e) => {
    const files = e.target.files;

    if (files && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
      return files;
    }

    setPreview("");
    return null;
  };

  useEffect(() => {
    if (image) {
      setPreview(image);
    }
  }, [image, loading]);

  const resetPreview = () => {
    setPreview(null);
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <label
        htmlFor={name}
        className="cursor-pointer relative flex flex-col justify-center items-center h-full bg-gray-100 rounded-lg border-2 border-dashed border-[#214e82] hover:border-[#2e61a8] transition-colors duration-300"
      >
        {label && (
          <span className="text-sm font-medium text-[#3e3e65] mb-2">
            {label}
          </span>
        )}

        <AnimatePresence>
          {preview || image ? (
            <motion.img
              src={preview || image}
              className={`${className} rounded-lg`}
              alt="Preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaImage className="text-[#214e82] mb-2" size={cameraSize} />
              <p className="text-sm text-[#3e3e65]">
                Click or drag image to upload
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {cameraIcon && !preview && !image && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaCamera
              size={cameraSize}
              className="text-[#214e82] hover:text-[#2e61a8] transition-colors duration-300"
            />
          </motion.div>
        )}

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field: { onChange } }) => (
            <input
              id={name}
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = handlePreview(e);
                onChange(files);
                if (!files) resetPreview();
              }}
            />
          )}
        />
      </label>
    </motion.div>
  );
}

export default GetImagePreview;
