import '../FormLayout/FormLayout.css';
import './ExpensesForm.css';
import { type ChangeEvent, type SyntheticEvent, useMemo, useState } from 'react';

type Checks = Record<string, boolean>;
interface DividedSum { fraction: number, ways: number }

const getSumDivided = (amount: number, checkStates: Checks): DividedSum => {
    const numberOfChecked = Object.values(checkStates).reduce((acc, value) => {
        return value ? acc + 1 : acc;
    }, 0);

    if (!numberOfChecked || !amount) {
        return { fraction: 0, ways: 0 };
    }

    return { fraction: Math.round(amount / numberOfChecked * 100) / 100, ways: numberOfChecked };
};

const getHintString = (amount: number, checkStates: Checks): string => {
    const result: DividedSum = getSumDivided(amount, checkStates);

    if (!result.fraction || !result.ways) {
        return '';
    }

    return `${String(result.fraction)} руб/чел`;
};

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

const GROUP_NAMES = ['Леша', 'Саша', 'Ваня', 'Толя', 'Вася', 'Акакий'];

export default function ExpensesForm() {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const [divideEvenly, setDivideEvenly] = useState<boolean>(true);

    const [checksState, setChecksState] = useState<Checks>(() => {
        return GROUP_NAMES.reduce((acc: Checks, value: string) => {
            return { ...acc, [value]: true };
        }, {});
    });

    const handleCheckStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name;

        setChecksState({ ...checksState, [elementName]: !checksState[elementName] });
    };

    // todo: не обновляется
    const hintString = useMemo(() => getHintString(+amount, checksState), [amount, checksState]);

    return (
        <div className={'form-layout__container'}>
            <div
                onClick={handleEditClick}
                style={{ border: '1px black solid' }}
                className='form-layout__row form-layout__row_bordered expense-form__row'
            >
                <input
                    type="text"
                    className='form-layout__text-input_invisible-border'
                    placeholder='Введите сумму'
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>

            {hintString && (
                <div className={'form-layout__row expense-form__row'}>
                    <span>{hintString}</span>
                </div>
            )}

            {
                divideEvenly ? (
                    <></>
                ) : (
                    GROUP_NAMES.map((name: string, index: number) => (
                        <div className='form-layout__row form-layout__row_bordered expense-form__row' key={index}>
                            <input
                                type="checkbox"
                                name={name}
                                onChange={handleCheckStateChange}
                            />
                            <span>{name}</span>
                        </div>
                    ))
                )
            }

            <button
                onClick={() => {
                    Object.keys(checksState).forEach((name: string) => {
                        checksState[name] = !divideEvenly;
                    });

                    setDivideEvenly((prev: boolean) => !prev);
                }}
            >{divideEvenly ? 'Выбрать из списка' : 'Разделить поровну'}</button>

            <button
                className='form-layout__button_primary form-layout__button_full-width'
                onClick={() => {
                    console.log(amount);
                    console.log(Object.keys(checksState).filter(name => checksState[name]));
                }}
            >Сохранить
            </button>
        </div>
    );
}
