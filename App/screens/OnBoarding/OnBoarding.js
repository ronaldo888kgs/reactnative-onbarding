import React from 'react'
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated, 
    Image, 
    TouchableOpacity
} from 'react-native';

//constants

import { images, theme } from '../../constants';
const {onboarding1, onboarding2, onboarding3} = images;

// Theme

const {COLORS, FONTS, SIZES} = theme;

// Dumy Data

const onBoardings = [
    {
        title: "Let's Travelling",
        description: "boarding1",
        img: onboarding1
    },
    {
        title: "Navigation",
        description: "boarding2",
        img: onboarding2
    },
    {
        title: "Destination",
        description: "boarding3",
        img: onboarding3
    }
]

const OnBoarding = () =>{

    const [completed, setCompleted] = React.useState(false);

    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        scrollX.addListener(({value})=> {
            if(Math.floor(onBoardings.length - 1 - value / SIZES.width) < 0.1 )
              setCompleted(true);
        })

        return () => scrollX.removeListener();
    }, [])

    //Render

    function renderContent()
    {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
               
            >
                {onBoardings.map((item, index) => (
                    <View
                        key={index}
                        style={{width: SIZES.width}}
                    >
                        {/**Image */}
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image
                                source={item.img} 
                                resizeMode="cover"
                                style={{width:"100%",height:"100%"}}
                            />
                        </View>

                        {/* Text */}

                        <View
                            style={{
                                position:'absolute',
                                bottom: '10%',
                                left:40,
                                right:40
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    color: COLORS.gray,
                                    textAlign:'center',
                                }}
                            >
                                {item.title}
                            </Text>
                            <Text 
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.gray,
                                    marginTop:SIZES.base,
                                    textAlign:'center'
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>

                        {/* Button */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0, 
                                width: 150,
                                height: 60,
                                justifyContent: 'center',
                                paddingLeft: 20,
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                backgroundColor: COLORS.blue, 
                                marginBottom: SIZES.base
                            }}
                            onPress={() => setCompleted(true)}
                        >
                                <Text 
                                    style={{...FONTS.h1, color: COLORS.white}}
                                >
                                    {completed ? "Let's Go" : "Skip"}
                                </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        );
        
    }

    function renderDots()
    {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View style={styles.dotContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: "clamp"
                    })
                    return (
                        <Animated.View
                            key= {'dot-' + index} 
                            opacity={opacity}
                            style={[styles.dot, {width:dotSize, height:dotSize}]}
                        >
                            
                        </Animated.View>
                    )
                })}
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotsRootContainer}>
                {renderDots()}
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    dotsRootContainer:{
        position: 'absolute',
        bottom: SIZES.height > 700 ? '30%' : '20%'
    },
    dotContainer:{
        flexDirection:'row',
        height: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot:{
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.blue,
        marginHorizontal: SIZES.radius / 2
    },
    
});

export default OnBoarding;