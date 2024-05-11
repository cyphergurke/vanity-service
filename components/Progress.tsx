import React from 'react'

const Progress = ({ translate, progress, targetProgress }: any) => {

    const getColor = (progress: number, targetProgress: number) => {
        const red = 255 * (1 - progress / targetProgress);
        const green = 255 * (progress / targetProgress);
        return `rgb(${red}, ${green}, 0)`;
    };


    return (
        <>
            <div className="mt-3 mb-3">
                <p style={{
                    color: getColor(progress, targetProgress),
                }}>
                    {translate.entropyText}
                </p>
            </div>
            <div className="h-2 bg-green-600 rounded-full mb-3"
                style={{
                    width: `${(progress / targetProgress) * 100}%`,
                    backgroundColor: getColor(progress, targetProgress),
                }}>
            </div>
        </>
    )
}

export default Progress