const HelpPage = ({ onBack }: { onBack : () => void }) => {
    return( 
        <div className="flex flex-col p-6 bg-gray-100 min-h-screen text-black">

            { /*title and description */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-6">Help Page</h1>
                <p className="max-w-2xl mb-16">This is a help page. It will explain every available options and ways to use them. 
                    If you have any questions or need assistance, please feel free to reach out to us.</p>
        </div>
    
        <div className="mb-16">
            <p className="text-2xl font-bold mb-4">Basic Function</p>
            <p className="pl-8">This program uses demucs's mdx-extra model as the main method of vocal extraction. </p>
        </div>

        <div className="mb-24">
            <p className="text-2xl font-bold mb-8">Extraction Options</p>
            <p className="font-bold mb-2">Extract accompaniment:</p>
            <p className="pl-8">Toggling this option on would also provide you an audio file of the accompaniments of the songs.</p>
        </div>

        <div className="text-center item-center mb-8">Please send us an email if you have further question: shumt@oregonstate.edu</div>
            <button className="bg-green-500 px-4 py-2 rounded-lg" onClick={onBack}> Back</button>
        </div>
    );
};

export default HelpPage;