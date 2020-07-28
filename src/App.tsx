// @ts-nocheck
import React from 'react';
import LeaderLine from 'leader-line-new';

interface LineTreeProps {
    start: any;
    end: any;
}

export const LineTree:React.FC<LineTreeProps> = ({start, end}) => {
    const line: any = React.useRef();
    React.useEffect(() => {
        const drawLine = () => {
            new LeaderLine(
                start.current,
                LeaderLine.pointAnchor(end.current, {x: '10%', y: '100%'}),
                {
                    path: 'grid',
                    startSocket: 'left',
                    endSocket: 'bottom',
                    color: 'black',
                    size: 2
                });
        };
        const timer = setInterval(() => {
            if(start.current) {
                clearInterval(timer);
                drawLine();
            }
        }, 5);
        return ()=> {
            timer && clearInterval(timer)
        }
    }, []);

    React.useEffect(() => {
        // scroll and resize listeners could be assigned here
        setTimeout(() => {
            // skip current even loop and wait
            // the end of parent's render call
            if (line.current && end?.current) {
                line.current.position();
            }
        }, 0);
    });

    return null;
};

class App extends React.Component {
    // @ts-ignore
    constructor(props) {
        super(props);
        // @ts-ignore
        this.myRef1 = React.createRef();
        // @ts-ignore
        this.myRef2 = React.createRef();
    }

    render() {
        // @ts-ignore
        const {myRef1, myRef2} = this;

        return (
            <div className="container">
                <LineTree start={myRef2} end={myRef1}/>
                <div
                    ref={myRef1}
                    style={{
                        width: '100px',
                        height: '50px',
                        background: 'black'
                    }}>{''}</div>
                <div style={{
                    marginLeft: '60px',
                }}>
                <div
                    ref={myRef2}
                    style={{
                        marginTop: '100px',
                        marginLeft: '60px',
                        width: '100px',
                        height: '50px',
                        background: 'black'
                    }}
                >{''}</div>
                </div>
            </div>);
    }
}

export default App;
