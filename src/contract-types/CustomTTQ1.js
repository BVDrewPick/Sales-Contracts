import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MenuTemplate, GenericLogoTemplate } from '../Images/ImageRepository';

const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#2b14db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    boxSizing: "border-box",
    display: "block",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "normal",
    height: "40px",
    margin: "0 0 10px 0",
};

const fileInputLabelStyle = {
    ...buttonStyle,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const inputStyle = {
    width: "100%",
    padding: "5px",
    marginTop: "5px",
    boxSizing: "border-box",
    height: "40px",
};

const resizeHandleStyle = {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "blue",
    borderRadius: "50%",
};

const templateButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 10px",
};

export function ReactStickerDesigner() {
    const [circleColor, setCircleColor] = useState("#ffffff");
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [designMode, setDesignMode] = useState("custom");
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const circleDiameter = 1400;
    const fixedZoom = 0.2;

    const fonts = [
        "Arial", "Helvetica", "Times New Roman", "Courier", "Verdana",
        "Georgia", "Palatino", "Garamond", "Bookman", "Comic Sans MS",
        "Trebuchet MS", "Arial Black", "Impact"
    ];

    const templateDesigns = useMemo(() => ({
        template1: {
            circleColor: "#e61d2f",
            elements: [
                {
                    type: "text",
                    content: "MENU",
                    x: 215,
                    y: 180,
                    width: 1000,
                    height: 240,
                    fontSize: 340,
                    fontFamily: "Horizon",
                    color: "#FFFFFF",
                    id: 1,
                },
                {
                    color : "#FFFFFF",
                    content: "(SCAN OR TAP)",
                    fontFamily: "Horizon",
                    fontSize: 32,
                    height: 90,
                    id: 3,
                    type: "text",
                    width: 265,
                    x: 575,
                    y: 415,                    
                },
                {
                    color: "#000000",
                    content: "https://example.com",
                    fontFamily: "Arial",
                    fontSize: 55,
                    height: 526,
                    id: 4,
                    type: "qrcode",
                    width: 523,
                    x: 445,
                    y: 495,
                },
                {
                    type: "nfctap",
                    content: "",
                    x: 245,
                    y: 90,
                    width: 35,
                    height: 35,
                    fontSize: 12,
                    fontFamily: "Arial",
                    color: "#FFFFFF",
                    id: 5,
                },
                {
                    type: "text",
                    content: "Place Logo Here",
                    y: 1150,
                    x: 475,
                    width: 495,
                    height: 115,
                    fontSize: 55,
                    fontFamily: "Horizon",
                    color: "#FFFFFF",
                    id: 6,
                },
            ],
        },
        template2: {
            circleColor: "#c1ff72",
            elements: [
                {
                    type: "text",
                    content: "(SCAN OR TAP)",
                    x: 520,
                    y: 640,
                    width: 350,
                    height: 75,
                    fontSize: 40,
                    fontFamily: "Horizon",
                    color: "#000000",
                    id: 1,
                },
                {
                    type: "qrcode",
                    content: "https://example.com",
                    x: 420,
                    y: 715,
                    width: 543,
                    height: 521,
                    fontSize: 12,
                    fontFamily: "Arial",
                    color: "#000000",
                    id: 2,
                },
                {
                    type: "nfctap",
                    content: "",
                    x: 245,
                    y: 160,
                    width: 35,
                    height: 35,
                    fontSize: 12,
                    fontFamily: "Arial",
                    color: "#FFFFFF",
                    id: 3,
                },
                {
                    type: "text",
                    content: "Place Logo Here",
                    x: 455,
                    y: 300,
                    width: 490,
                    height: 90,
                    fontSize: 72,
                    fontFamily: "Horizon",
                    color: "#000000",
                    id: 4,
                },
            ],
        },
    }), []);

    const loadTemplate = useCallback((template) => {
        setCircleColor(templateDesigns[template].circleColor);
        setElements(templateDesigns[template].elements);
        setDesignMode(template);
    }, [templateDesigns]);

    const startCustomDesign = useCallback(() => {
        setCircleColor("#ffffff");
        setElements([]);
        setDesignMode("custom");
    }, []);

    const addElement = useCallback((type, content) => {
        const newElement = {
            type,
            content,
            x: circleDiameter / 4,
            y: circleDiameter / 4,
            width: type === "qrcode" ? 168 : type === "text" ? 100 : type === "logo" ? 100 : 40,
            height: type === "qrcode" ? 176 : type === "text" ? 40 : type === "logo" ? 100 : 40,
            fontSize: type === "text" ? 20 : 40,
            fontFamily: "Arial",
            color: "#000000",
            id: Date.now(),
        };
        setElements(prevElements => [...prevElements, newElement]);
        setSelectedElement(newElement);
    }, [circleDiameter]);

    const updateElement = useCallback((id, updates) => {
        setElements(prevElements =>
            prevElements.map(el => el.id === id ? { ...el, ...updates } : el)
        );
        setSelectedElement(prev =>
            prev && prev.id === id ? { ...prev, ...updates } : prev
        );
    }, []);

    const deleteElement = useCallback((id) => {
        setElements(prevElements => prevElements.filter(el => el.id !== id));
        setSelectedElement(null);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Delete" && selectedElement) {
                deleteElement(selectedElement.id);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedElement, deleteElement]);

    const renderCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = circleDiameter;
        canvas.height = circleDiameter;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = circleColor;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
        ctx.fill();

        elements.forEach((element) => {
            ctx.save();
            ctx.translate(element.x, element.y);

            if (element.type === "text") {
                ctx.font = `${element.fontSize}px ${element.fontFamily}`;
                ctx.fillStyle = element.color;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(element.content, element.width / 2, element.height / 2);
            } else if (element.type === "logo") {
                const img = new Image();
                img.src = element.content;
                ctx.drawImage(img, 0, 0, element.width, element.height);
            } else if (element.type === "qrcode") {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, element.width, element.height);
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 2;
                ctx.strokeRect(0, 0, element.width, element.height);

                ctx.fillStyle = "#000000";
                ctx.font = `${Math.min(element.width, element.height) / 10}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                const lines = [
                    "QR CODE",
                    "PLACEHOLDER",
                    "(QR CODE WILL",
                    "BE GENERATED",
                    "HERE)",
                ];
                lines.forEach((line, index) => {
                    ctx.fillText(line, element.width / 2, (element.height / 6) * (index + 1));
                });
            }

            ctx.restore();
        });
    }, [elements, circleColor, circleDiameter]);

    useEffect(() => {
        renderCanvas();
    }, [renderCanvas]);

    const getCanvasImage = useCallback(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                renderCanvas();
                const canvas = canvasRef.current;
                resolve(canvas ? canvas.toDataURL("image/png") : "");
            }, 500);
        });
    }, [renderCanvas]);

    const sendToBackend = useCallback(async () => {
        const imageData = await getCanvasImage();
        
        const contactFormData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
    
        const formData = new FormData();
        
        Object.keys(contactFormData).forEach(key => {
            formData.append(key, contactFormData[key]);
        });
    
        formData.append('stickerDesign', JSON.stringify({
            elements,
            circleColor,
            designMode,
        }));
        formData.append('stickerImage', imageData);
    
        try {
            const response = await fetch("https://hooks.zapier.com/hooks/catch/16953346/24ek7b2/", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
    
                localStorage.removeItem('contactFormData');
                localStorage.removeItem('stickerDesignData');
    
                const quantity = parseInt(contactFormData.quantity, 10);
    
                let redirectUrl;
                switch (quantity) {
                    case 1:
                        redirectUrl = 'https://buy.stripe.com/cN228Vd4w6347ugaFR';
                        break;
                    case 2:
                        redirectUrl = 'https://buy.stripe.com/bIY7tf1lO7786qc9BU';
                        break;
                    case 3:
                        redirectUrl = 'https://buy.stripe.com/00g00Ne8A9fgdSE29t';
                        break;
                    case 4:
                        redirectUrl = 'https://buy.stripe.com/3csdRDc0s9fgg0MaG0';
                        break;
                    case 5:
                        redirectUrl = 'https://buy.stripe.com/eVa5l71lOfDEdSEeWh';
                        break;
                    default:
                        redirectUrl = 'https://buy.stripe.com/cN228Vd4w6347ugaFR';
                }
    
                window.location.href = redirectUrl;
            } else {
                const responseText = await response.text();
                console.log(responseText)
            }
        } catch (error) {
        }
    }, [elements, getCanvasImage, circleColor, designMode]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            fontFamily: "Arial, sans-serif",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                borderBottom: "1px solid #ccc",
            }}>
                <div onClick={() => loadTemplate("template1")} style={templateButtonStyle}>
                    <img src={MenuTemplate} alt="Menu template" style={{ width: 100, height: 100, borderRadius: "50%" }} />
                    <span>Menu template</span>
                </div>
                <div onClick={() => loadTemplate("template2")} style={templateButtonStyle}>
                    <img src={GenericLogoTemplate} alt="Generic Logo template" style={{ width: 100, height: 100, borderRadius: "50%" }} />
                    <span>Generic Logo template</span>
                </div>
                <div onClick={startCustomDesign} style={templateButtonStyle}>
                    <div style={{ width: 100, height: 100, backgroundColor: "#ffffff", borderRadius: "50%", border: "1px solid #ccc" }}></div>
                    <span>Custom Design</span>
                </div>
            </div>
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                <div style={{
                    width: 200,
                    padding: 20,
                    backgroundColor: "#f0f0f0",
                    borderRight: "1px solid #ccc",
                    overflowY: "auto",
                }}>
                    <h3 style={{ marginTop: 0, marginBottom: 20, textAlign: "center" }}>Sticker Designer</h3>
                    <button onClick={() => addElement("text", "New Text")} style={buttonStyle}>
                        Add Text
                    </button>
                    <label style={fileInputLabelStyle}>
                        Add Logo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => addElement("logo", e.target?.result);
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                            }}
                        />
                    </label>
                    <button onClick={() => addElement("qrcode", "https://example.com")} style={buttonStyle}>
                        Add QR Code
                    </button>
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        <label style={{ display: "block", marginBottom: 5 }}>Background Color</label>
                        <input
                            type="color"
                            value={circleColor}
                            onChange={(e) => setCircleColor(e.target.value)}
                            style={{ ...inputStyle, padding: 0, border: "none" }}
                        />
                    </div>
                    {selectedElement && (
                        <div style={{ marginTop: 20 }}>
                            <h4 style={{ marginBottom: 10, textAlign: "center" }}>Element Properties</h4>
                            {selectedElement.type === "text" && (
                                <>
                                    <input
                                        type="text"
                                        value={selectedElement.content}
                                        onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                                        style={inputStyle}
                                    />
                                    <input
                                        type="color"
                                        value={selectedElement.color}
                                        onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                                        style={{ ...inputStyle, padding: 0, border: "none" }}
                                    />
                                    <input
                                        type="number"
                                        value={selectedElement.fontSize}
                                        onChange={(e) => {
                                            const newSize = Math.max(1, parseInt(e.target.value) || 1);
                                            updateElement(selectedElement.id, { fontSize: newSize });
                                        }}
                                        style={inputStyle}
                                    />
                                    <select
                                        value={selectedElement.fontFamily}
                                        onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
                                        style={inputStyle}
                                    >
                                        {fonts.map((font) => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                </>
                            )}
                            {selectedElement.type === "logo" && (
                                <input
                                    type="number"
                                    value={selectedElement.width}
                                    onChange={(e) => updateElement(selectedElement.id, {
                                        width: Number(e.target.value),
                                        height: Number(e.target.value),
                                    })}
                                    style={inputStyle}
                                />
                            )}
                            {selectedElement.type === "qrcode" && (
                                <input
                                    type="text"
                                    value={selectedElement.content}
                                    onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                                    style={inputStyle}
                                    placeholder="QR Code content"
                                />
                            )}
                            <button
                                onClick={() => deleteElement(selectedElement.id)}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: "#ff4444",
                                    marginTop: 20,
                                }}
                            >
                                Delete Element
                            </button>
                        </div>
                    )}
                    <button onClick={sendToBackend} style={buttonStyle}>
                        Send to Zapier
                    </button>
                </div>
                <div style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#e0e0e0",
                    overflow: "auto",
                }}>
                    <div
                        ref={containerRef}
                        style={{
                            position: "relative",
                            width: circleDiameter * fixedZoom,
                            height: circleDiameter * fixedZoom,
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            backgroundColor: circleColor,
                            overflow: "hidden",
                        }}>
                            {elements.map((element) => (
                                <DraggableElement
                                    key={element.id}
                                    element={element}
                                    updateElement={updateElement}
                                    setSelectedElement={setSelectedElement}
                                    isSelected={selectedElement && selectedElement.id === element.id}
                                    circleDiameter={circleDiameter}
                                    renderCanvas={renderCanvas}
                                    zoom={fixedZoom}
                                />
                            ))}
                        </div>
                        <canvas
                            ref={canvasRef}
                            width={circleDiameter}
                            height={circleDiameter}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DraggableElement({
    element,
    updateElement,
    setSelectedElement,
    isSelected,
    circleDiameter,
    renderCanvas,
    zoom,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isEditing, setIsEditing] = useState(false);

    const handleMouseDown = (e) => {
        if (!isEditing) {
            setIsDragging(true);
            setDragStart({ x: e.clientX / zoom - element.x, y: e.clientY / zoom - element.y });
        }
    };

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            const newX = Math.max(0, Math.min(e.clientX / zoom - dragStart.x, circleDiameter - element.width));
            const newY = Math.max(0, Math.min(e.clientY / zoom - dragStart.y, circleDiameter - element.height));
            updateElement(element.id, { x: newX, y: newY });
            renderCanvas();
        }
    }, [isDragging, dragStart, element, updateElement, circleDiameter, renderCanvas, zoom]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleResize = (e, corner) => {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = element.width;
        const startHeight = element.height;

        const handleMouseMove = (moveEvent) => {
            const deltaX = (moveEvent.clientX - startX) / zoom;
            const deltaY = (moveEvent.clientY - startY) / zoom;
            let newWidth, newHeight, newX = element.x, newY = element.y;
        
            switch (corner) {
                case "topLeft":
                    newWidth = Math.max(20, startWidth - deltaX);
                    newHeight = Math.max(20, startHeight - deltaY);
                    newX = Math.min(element.x + startWidth - newWidth, circleDiameter - newWidth);
                    newY = Math.min(element.y + startHeight - newHeight, circleDiameter - newHeight);
                    break;
                case "topRight":
                    newWidth = Math.min(Math.max(20, startWidth + deltaX), circleDiameter - element.x);
                    newHeight = Math.max(20, startHeight - deltaY);
                    newY = Math.min(element.y + startHeight - newHeight, circleDiameter - newHeight);
                    break;
                case "bottomLeft":
                    newWidth = Math.max(20, startWidth - deltaX);
                    newHeight = Math.min(Math.max(20, startHeight + deltaY), circleDiameter - element.y);
                    newX = Math.min(element.x + startWidth - newWidth, circleDiameter - newWidth);
                    break;
                case "bottomRight":
                    newWidth = Math.min(Math.max(20, startWidth + deltaX), circleDiameter - element.x);
                    newHeight = Math.min(Math.max(20, startHeight + deltaY), circleDiameter - element.y);
                    break;
                default:
                    console.warn(`Unexpected corner value: ${corner}`);
                    return; // Exit the function without updating
            }
        
            updateElement(element.id, { width: newWidth, height: newHeight, x: newX, y: newY });
            renderCanvas();
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const commonStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 0,
        margin: 0,
        lineHeight: 1,
        overflow: "hidden",
        background: "transparent",
        resize: "none",
        border: "none",
        userSelect: "none",
    };

    const commonTextStyle = {
        ...commonStyle,
        fontFamily: element.fontFamily,
        fontSize: `${element.fontSize * zoom}px`,
        color: element.color,
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                position: "absolute",
                top: element.y * zoom,
                left: element.x * zoom,
                cursor: isEditing ? "text" : "move",
                border: isSelected ? "2px solid blue" : "none",
                padding: 0,
                width: element.width * zoom,
                height: element.height * zoom,
            }}
            onClick={() => setSelectedElement(element)}
        >
            {element.type === "text" && (
                isEditing ? (
                    <textarea
                        value={element.content}
                        onChange={(e) => updateElement(element.id, { content: e.target.value })}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                        style={commonTextStyle}
                    />
                ) : (
                    <div onDoubleClick={() => setIsEditing(true)} style={commonTextStyle}>
                        {element.content}
                    </div>
                )
            )}
            {element.type === "logo" && (
                <img
                    src={element.content}
                    style={{
                        ...commonStyle,
                        objectFit: "contain",
                    }}
                    alt="Uploaded logo"
                    draggable={false}
                />
            )}
            {element.type === "qrcode" && (
                <div style={{
                    ...commonStyle,
                    backgroundColor: "white",
                    border: "2px solid black",
                    flexDirection: "column",
                    fontSize: `${Math.min(element.width, element.height) / 10 * zoom}px`,
                    color: "black",
                    lineHeight: 1.2,
                }}>
                    <div>QR CODE</div>
                    <div>PLACEHOLDER</div>
                    <div>(QR CODE WILL</div>
                    <div>BE GENERATED</div>
                    <div>HERE)</div>
                </div>
            )}
            {isSelected && (
                <>
                    <div style={{ ...resizeHandleStyle, top: -5, left: -5, cursor: "nwse-resize" }} onMouseDown={(e) => handleResize(e, "topLeft")} />
                    <div style={{ ...resizeHandleStyle, top: -5, right: -5, cursor: "nesw-resize" }} onMouseDown={(e) => handleResize(e, "topRight")} />
                    <div style={{ ...resizeHandleStyle, bottom: -5, left: -5, cursor: "nesw-resize" }} onMouseDown={(e) => handleResize(e, "bottomLeft")} />
                    <div style={{ ...resizeHandleStyle, bottom: -5, right: -5, cursor: "nwse-resize" }} onMouseDown={(e) => handleResize(e, "bottomRight")} />
                </>
            )}
        </div>
    );
}

export default ReactStickerDesigner;