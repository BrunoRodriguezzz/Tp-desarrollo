import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import './cargaFiles.css';
import 'antd/dist/reset.css';

// Convert File -> base64 string for preview when no URL is available
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Upload widget that doesn't actually upload, it just collects image files and shows thumbnails.
// It notifies parent with onFilesChange(File[])
const CargaFiles = ({ onFilesChange, maxCount }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Lift File[] to parent
    if (typeof onFilesChange === 'function') {
      const files = newFileList
        .map((f) => f.originFileObj)
        .filter(Boolean);
      onFilesChange(files);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        // Prevent actual upload, keep files in list
        beforeUpload={() => false}
        multiple
        maxCount={maxCount}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= (maxCount || 8) ? null : uploadButton}
      </Upload>
      {previewOpen && previewImage && (
        <div className="carga-files-preview-overlay" onClick={() => setPreviewOpen(false)}>
          <div className="carga-files-preview-content" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage} alt="preview" className="carga-files-preview-image" />
            <button type="button" className="carga-files-preview-close" onClick={() => setPreviewOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

CargaFiles.propTypes = {
  onFilesChange: PropTypes.func,
  maxCount: PropTypes.number,
};

CargaFiles.defaultProps = {
  onFilesChange: undefined,
  maxCount: 8,
};

export default CargaFiles;
export { CargaFiles };