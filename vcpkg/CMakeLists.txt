cmake_minimum_required(VERSION 3.10)
project(drive_file_counter VERSION 1.0.0 LANGUAGES C)

include_directories(include)

add_library(drive_file_counter STATIC src/drive_file_counter.c)

install(TARGETS drive_file_counter
        ARCHIVE DESTINATION lib
        LIBRARY DESTINATION lib
        RUNTIME DESTINATION bin)
install(DIRECTORY include/ DESTINATION include)
