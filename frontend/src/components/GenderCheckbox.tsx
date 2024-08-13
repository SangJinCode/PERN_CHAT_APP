//Singup.tsx로 부터 selectedGender,onCheckboxChange을 전달받는다.
//selectedGender는 checked 의 상태값 관리를위해 사용되고 
//onCheckboxChange는 "male" or "female"값을 상위 컴포넌트로 전달하기위한 함수이다.

const GenderCheckbox = ({
    selectedGender,
    onCheckboxChange,
}: {
    selectedGender: string;
    onCheckboxChange: (gender: "male" | "female") => void;
}) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                    <span className="label-text">Male</span>
                    <input 
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                    <span className="label-text">Female</span>
                    <input 
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={selectedGender === "female"}
                        onChange={() => onCheckboxChange("female")}
                    />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox;