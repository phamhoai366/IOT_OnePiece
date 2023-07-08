################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../autogen/sl_device_init_clocks.c \
../autogen/sl_event_handler.c 

OBJS += \
./autogen/sl_device_init_clocks.o \
./autogen/sl_event_handler.o 

C_DEPS += \
./autogen/sl_device_init_clocks.d \
./autogen/sl_event_handler.d 


# Each subdirectory must supply rules for building sources it contributes
autogen/sl_device_init_clocks.o: ../autogen/sl_device_init_clocks.c autogen/subdir.mk
	@echo 'Building file: $<'
	@echo 'Invoking: GNU ARM C Compiler'
	arm-none-eabi-gcc -g -gdwarf-2 -mcpu=cortex-m33 -mthumb -std=c99 '-DDEBUG=1' '-DDEBUG_EFM=1' '-DBGM220PC22HNA=1' '-DSL_COMPONENT_CATALOG_PRESENT=1' -I"H:\Download\BGM220\LED\led\config" -I"H:\Download\BGM220\LED\led\autogen" -I"H:\Download\BGM220\LED\led" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/Device/SiliconLabs/BGM22/Include" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/CMSIS/Core/Include" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/service/device_init/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/emlib/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/common/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/common/toolchain/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/service/system/inc" -Os -Wall -Wextra -mno-sched-prolog -fno-builtin -ffunction-sections -fdata-sections -imacrossl_gcc_preinclude.h -mfpu=fpv5-sp-d16 -mfloat-abi=hard -mcmse --specs=nano.specs -c -fmessage-length=0 -MMD -MP -MF"autogen/sl_device_init_clocks.d" -MT"$@" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '

autogen/sl_event_handler.o: ../autogen/sl_event_handler.c autogen/subdir.mk
	@echo 'Building file: $<'
	@echo 'Invoking: GNU ARM C Compiler'
	arm-none-eabi-gcc -g -gdwarf-2 -mcpu=cortex-m33 -mthumb -std=c99 '-DDEBUG=1' '-DDEBUG_EFM=1' '-DBGM220PC22HNA=1' '-DSL_COMPONENT_CATALOG_PRESENT=1' -I"H:\Download\BGM220\LED\led\config" -I"H:\Download\BGM220\LED\led\autogen" -I"H:\Download\BGM220\LED\led" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/Device/SiliconLabs/BGM22/Include" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/CMSIS/Core/Include" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/service/device_init/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/emlib/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/common/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/common/toolchain/inc" -I"C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk//platform/service/system/inc" -Os -Wall -Wextra -mno-sched-prolog -fno-builtin -ffunction-sections -fdata-sections -imacrossl_gcc_preinclude.h -mfpu=fpv5-sp-d16 -mfloat-abi=hard -mcmse --specs=nano.specs -c -fmessage-length=0 -MMD -MP -MF"autogen/sl_event_handler.d" -MT"$@" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


