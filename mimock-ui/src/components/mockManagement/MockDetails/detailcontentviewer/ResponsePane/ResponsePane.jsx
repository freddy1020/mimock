import React, { useEffect } from 'react';
import {
	NavTabPane,
	ContentItem,
	ItemLabel,
	Item,
	ItemPreFormat,
	Code,
	DownloadWrapper,
	DownloadFile,
} from './ResponsePane.style';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import mime from 'mime';
import fileDownload from 'js-file-download';
import { Base64 } from 'js-base64';
import { IconButtonVariants } from 'styles/Button';
import { constants } from './constants';

function ResponsePane({
	responseHeader,
	contentType,
	mockId,
	textResponse,
	binaryResponse,
	responseType,
}) {
	// #region Defaults
	const { testIds, labels, defaultFieldType } = constants;
	// #endregion

	// #region Common Hooks
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	// #endregion

	// #region Handler functions
	const downloadFile = (e) => {
		e.preventDefault();

		const fileName = `${mockId}.${mime.getExtension(contentType)}`;
		const blob = new Blob([Base64.toUint8Array(binaryResponse)]);

		fileDownload(blob, fileName);
	};
	// #endregion

	return (
		<NavTabPane data-testid={testIds.responseNavTabPane}>
			<ContentItem>
				<ItemLabel>{labels.responseHeader}</ItemLabel>
				<ItemPreFormat data-testid={testIds.responseHeader}>
					<Code>{responseHeader}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.responseContentType}</ItemLabel>
				<Item
					data-testid={testIds.responseContentType}
					type={defaultFieldType}
					defaultValue={contentType}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.expectedResponse}</ItemLabel>
				<Choose>
					<When condition={responseType === 'TEXTUAL_RESPONSE'}>
						<ItemPreFormat data-testid={testIds.expectedResponse}>
							<Code>{textResponse}</Code>
						</ItemPreFormat>
					</When>
					<When condition={responseType === 'BINARY_RESPONSE'}>
						<DownloadWrapper>
							<DownloadFile
								dataTestid={`download-file`}
								label='Download file'
								variant={IconButtonVariants.DownloadButton}
								onclickHandler={downloadFile}
							/>
						</DownloadWrapper>
					</When>
				</Choose>
			</ContentItem>
		</NavTabPane>
	);
}

ResponsePane.propTypes = {
	responseHeader: PropTypes.string.isRequired,
	contentType: PropTypes.string.isRequired,
	responseType: PropTypes.string.isRequired,
	mockId: PropTypes.string.isRequired,
	binaryResponse: PropTypes.string,
	textResponse: PropTypes.string,
};

export default ResponsePane;
