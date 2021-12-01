qPack("CDragEnterEvent", function(){

    function CDragEnterEvent( owner, data ){
        const timeStamp =  Date.now();
        qExtend( this, QB.CEvent, owner,"CDragEnterEvent" );
        const dataType = qTypeOf(data);
    }

    return CDragEnterEvent;
});
qPack("CDragLeaveEvent", function(){

    function CDragLeaveEvent( owner, data ){
        const timeStamp =  Date.now();
        qExtend( this, QB.CEvent, owner,"CDragLeaveEvent" );
        const dataType = qTypeOf(data);
    }

    return CDragLeaveEvent;
});
qPack("CDragMoveEvent", function(){

    function CDragMoveEvent( owner, data ){
        const timeStamp =  Date.now();
        qExtend( this, QB.CEvent, owner,"CDragMoveEvent" );
        const dataType = qTypeOf(data);
    }

    return CDragMoveEvent;
});

qPack("CDropEvent", function(){

    function CDropEvent( owner, data ){
        const timeStamp =  Date.now();
        qExtend( this, QB.CEvent, owner,"CDropEvent" );
        const dataType = qTypeOf(data);
    }

    return CDropEvent;
});