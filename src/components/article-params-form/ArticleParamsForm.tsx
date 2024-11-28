import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

interface ArticleParamsReturnFunc {
	(articleState: ArticleStateType): void;
}

export const ArticleParamsForm = ({
	articleParamsReturn,
}: {
	articleParamsReturn: ArticleParamsReturnFunc;
}) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const className = clsx(styles.container, {
		[styles.container_open]: isSidebarOpen,
	});
	const [articleState, setArticleState] = useState(defaultArticleState);

	const stateChange = (key: string, option: OptionType) => {
		setArticleState((prevState) => ({ ...prevState, [key]: option }));
	};

	const sidebarHandler = () =>
		setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		articleParamsReturn(articleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		articleParamsReturn(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setIsSidebarOpen,
	});

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isSidebarOpen} onClick={sidebarHandler} />
			<aside className={className}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						onChange={(option) => stateChange('fontFamily', option)}
						title={'Шрифт'}
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						onChange={(option) => stateChange('fontSizeOption', option)}
						name={'radio'}
						title={'Размер шрифта'}
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
					/>
					<Select
						onChange={(option) => stateChange('fontColor', option)}
						title={'Цвет шрифта'}
						selected={articleState.fontColor}
						options={fontColors}
					/>
					<Separator />
					<Select
						onChange={(option) => stateChange('backgroundColor', option)}
						title={'Цвет фона'}
						selected={articleState.backgroundColor}
						options={backgroundColors}
					/>
					<Select
						onChange={(option) => stateChange('contentWidth', option)}
						title={'Ширина контента'}
						selected={articleState.contentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
