'use client';
import classNames from 'classnames';
import React, {
  ChangeEvent,
  DragEvent,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import mime from 'mime-types';

export type BaseFileUploaderType = {
  onChange?: (files: File[]) => void;
  label?: ReactNode;
  deleteIcon?: ReactNode;
  messages: {
    duplicates: string;
    size: string;
    maxCount: string;
    blacklist: string;
  };
  styles?: {
    wrapper?: string;
    area?: string;
    message?: string;
    messageClose?: string;
    deleteFile?: string;
    addedFiles?: string;
    addedFileInfo?: string;
    addedFile?: string;
    input?: string;
    dragHover?: string;
  };
  options?: {
    blacklist?: string[];
    multiple?: boolean;
    maxSize?: number;
    maxCount?: number;
    displaySize?: boolean;
    messageDuration?: number | false;
  };
};

const BaseFileUploader: FC<BaseFileUploaderType> = ({
  label = 'Upload',
  messages,
  deleteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      clipRule="evenodd"
      className="w-[24px] h-[24px]"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="nonzero"
        d="M12.002 2.005c5.518 0 9.998 4.48 9.998 9.997C22 17.52 17.52 22 12.002 22c-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497S7.312 20.5 12.002 20.5s8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718A.75.75 0 0 1 16 8.743a.75.75 0 0 1-.219.531l-2.717 2.717 2.727 2.728a.75.75 0 0 1-1.06 1.062l-2.729-2.728-2.728 2.728a.751.751 0 0 1-1.061-1.062l2.728-2.728-2.722-2.722a.75.75 0 0 1 1.062-1.061z"
      />
    </svg>
  ),
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [infoMessage, setInfoMessage] = useState<string>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [localStates, setLocalStates] = useState<
    Record<string, string | boolean>
  >({
    dragOver: false,
    dragDrop: false,
    mouseOver: false,
  });

  const standardClasses = {
    area: 'transition-all',
    wrapper: 'transition-all',
    input: '',
  };

  const defaultOptions = {
    maxSize: 4000000,
    maxCount: 5,
    displaySize: true,
    multiple: true,
    messageDuration: 5000,
    blacklist: [],
  };

  const defaultStyles = {
    wrapper: 'flex flex-col gap-2',
    area: 'relative w-full overflow-hidden border border-black p-5 flex flex-col gap-2 border-dashed rounded-[25px]',
    message: 'text-xs text-[red] flex flex-row gap-2',
    messageClose: 'p-1/2 px-2 text-xs rounded-[8px] bg-black text-white',
    deleteFile: 'p-1/2  hover:scale-[1.1]',
    addedFiles: 'flex flex-row flex-wrap p-1 px-0 gap-2 w-full',
    addedFileInfo: 'flex-1 truncate text-sm max-w-[150px]',
    addedFile:
      'p-1 px-3 rounded-[8px] bg-slate-300 flex flex-row items-center justify-between gap-2 border-b last:border-0 hover:bg-slate-200',
    input: 'absolute left-[9999999px] opacity-0',
    dragHover: 'bg-[rgba(0,0,0,0.05)]',
  };

  const options = { ...defaultOptions, ...props.options };
  const defaultClasses = { ...defaultStyles, ...props.styles };

  useEffect(() => {
    onChange && onChange(uploadedFiles);
  }, [uploadedFiles]);

  function handleDelete(file: File) {
    setInfoMessage(undefined);

    removeFile(file);
  }
  function handleDragOver(state: 'over' | 'leave') {
    setLocalStates({
      ...localStates,
      dragOver: state == 'over' ? true : false,
    });
  }
  function handleMouse(state: 'over' | 'leave') {
    setLocalStates({
      ...localStates,
      mouseOver: state == 'over' ? true : false,
    });
  }

  const getSizeInKb = (size: number) => size / 1000;

  const isFileAlreadyAdded = ({ name }: File) => {
    const fileMatches = uploadedFiles.filter((file) => name == file.name);
    return fileMatches.length > 0;
  };
  const isFileTooLarge = ({ size }: File) => {
    return size > options?.maxSize!;
  };
  const isFileInBlacklist = ({ type, ...file }: File) => {
    const mimeType = mime.extension(type);
    if (!mimeType) return true;
    return options?.blacklist.includes(mimeType);
  };

  function removeFile(file: File) {
    setUploadedFiles(uploadedFiles.filter(({ name }) => file.name !== name));
  }

  function setMessage(message: string) {
    setInfoMessage(message);

    if (options.messageDuration) {
      setTimeout(() => {
        setInfoMessage(undefined);
      }, options.messageDuration);
    }
  }

  const arrayFromFileList = (files: FileList): File[] => Array.from(files!);

  function handleClick(e: DragEvent<HTMLDivElement>) {
    inputRef.current?.click();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const newFiles = arrayFromFileList(e.target?.files!);
    uploadFiles(newFiles);
  }

  async function uploadFiles(newFiles: File[]) {
    setInfoMessage(undefined);

    const duplicates = newFiles.filter(isFileAlreadyAdded);
    const tooLargeFiles = newFiles.filter(isFileTooLarge);
    const inBlacklist = newFiles.filter(isFileInBlacklist);

    let updatedFiles = newFiles;

    // Filter out unsupported files to separate lists
    const fileNames = {
      duplicates: duplicates.map(({ name }) => name),
      largeFiles: tooLargeFiles.map(({ name }) => name),
      blacklist: inBlacklist.map(({ name }) => name),
    };

    let messageList = [] as string[];

    // Add messages for eventual errors
    if (inBlacklist.length > 0) {
      messageList.push(
        `${messages.blacklist}: ${fileNames.blacklist.join(', ')}`,
      );
    }

    if (duplicates.length > 0) {
      messageList.push(
        `${messages.duplicates}: ${fileNames.duplicates.join(', ')}`,
      );
    }

    if (tooLargeFiles.length > 0) {
      messageList.push(`${messages.size}: ${fileNames.largeFiles.join(', ')}`);
    }

    const unsupportedFileNames = [
      ...fileNames.duplicates,
      ...fileNames.largeFiles,
      ...fileNames.blacklist,
    ];

    // Filter out unsupported files before updating state
    updatedFiles = await Promise.all(
      newFiles.filter((file) => !unsupportedFileNames.includes(file.name)),
    );

    const filesList = [...uploadedFiles, ...updatedFiles];

    if (filesList.length > options.maxCount) {
      messageList.push(`${messages.maxCount} ${options.maxCount}`);
    }

    setMessage(messageList.join(', '));
    setUploadedFiles(filesList.slice(0, options.maxCount));
    setLocalStates({ ...localStates, dragOver: false, dragDrop: true });
  }

  async function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const newFiles = arrayFromFileList(e.dataTransfer?.files);

    uploadFiles(newFiles);
  }

  return (
    <div
      className={classNames(standardClasses.wrapper, defaultClasses.wrapper)}
    >
      <div
        draggable
        className={classNames(
          standardClasses.area,
          defaultClasses.area,
          localStates.dragOver && defaultClasses.dragHover,
        )}
        onDragOver={(e) => {
          e.preventDefault();
          handleDragOver('over');
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          handleDragOver('leave');
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
          handleMouse('over');
        }}
        onMouseLeave={() => handleMouse('leave')}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {label}
        {infoMessage && (
          <div className={classNames(defaultClasses.message)}>
            <p>{infoMessage}</p>
            {!options.messageDuration && (
              <div
                className={defaultClasses.messageClose}
                onClick={(e) => {
                  e.stopPropagation();
                  setInfoMessage(undefined);
                }}
              >
                Ok
              </div>
            )}
          </div>
        )}
        <input
          multiple={options.multiple}
          ref={inputRef}
          onChange={handleInputChange}
          className={classNames(standardClasses.input, defaultClasses.input)}
          type="file"
        />
        {uploadedFiles?.length > 0 && (
          <div className={classNames(defaultClasses.addedFiles)}>
            {uploadedFiles.map((file) => (
              <div
                key={`file-uploader-${file.lastModified}`}
                className={classNames(defaultClasses.addedFile)}
              >
                <div className={classNames(defaultClasses.addedFileInfo)}>
                  <span className=" ">{file.name}</span>
                  {options.displaySize && (
                    <div className="text-xs">({getSizeInKb(file.size)} KB)</div>
                  )}
                </div>
                <div
                  className={classNames(
                    'cursor-pointer',
                    defaultClasses.deleteFile,
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file);
                  }}
                >
                  {deleteIcon}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseFileUploader;
